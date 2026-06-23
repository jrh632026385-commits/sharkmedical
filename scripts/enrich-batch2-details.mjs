/**
 * 将第二批 164 条疾病的 diseaseDetails 补全并规范化（不含图库）。
 * 内容：data/batch2-details/*.mjs → enrichments/*.mjs → medical-fixes.mjs → list-variation.mjs
 *
 * 列表字段（clinical / mgmt / ddx / pitfalls / pearls）条数不限：有多少写多少，不凑 3 条或 4 条。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { normalizeDetail, isGenericText } from './batch2-detail-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const detailsDir = path.join(root, 'data', 'batch2-details');
const enrichDir = path.join(detailsDir, 'enrichments');

function applyOverlay(base, overlay) {
  if (!overlay) return { ...base };
  const out = { ...base };
  for (const [k, v] of Object.entries(overlay)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      // 列表字段：原样采用源条数，不截断、不补齐
      out[k] = v.map(item => (Array.isArray(item) ? [...item] : item));
    } else if (typeof v === 'string' && v.trim()) {
      out[k] = v.trim();
    }
  }
  return out;
}

async function importBlock(filePath) {
  const mod = await import(pathToFileURL(filePath).href);
  return mod.default || mod.CONTENT || {};
}

async function loadAllContent() {
  const merged = {};
  if (!fs.existsSync(detailsDir)) return merged;

  // 1) 基础模块
  for (const file of fs.readdirSync(detailsDir)) {
    if (!/\.mjs$/.test(file) || file === 'medical-fixes.mjs') continue;
    const block = await importBlock(path.join(detailsDir, file));
    for (const [type, detail] of Object.entries(block)) {
      merged[type] = { ...detail };
    }
  }

  // 2) enrichments 富文本层（覆盖同名字段）
  if (fs.existsSync(enrichDir)) {
    for (const file of fs.readdirSync(enrichDir)) {
      if (!/\.mjs$/.test(file)) continue;
      const block = await importBlock(path.join(enrichDir, file));
      for (const [type, detail] of Object.entries(block)) {
        merged[type] = applyOverlay(merged[type] || {}, detail);
      }
    }
  }

  // 3) medical-fixes 在 normalize 之后单独叠加，避免被中文化脚本破坏

  // 4) list-variation：按临床需要增减列表条数（覆盖式，可为 2 条或 6+ 条）
  const varPath = path.join(enrichDir, 'list-variation.mjs');
  if (fs.existsSync(varPath)) {
    const variations = await importBlock(varPath);
    for (const [type, patch] of Object.entries(variations)) {
      merged[type] = applyOverlay(merged[type] || {}, patch);
    }
  }

  return merged;
}

const contentMap = await loadAllContent();
const fixPath = path.join(detailsDir, 'medical-fixes.mjs');
const medicalFixes = fs.existsSync(fixPath) ? await importBlock(fixPath) : {};
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const diseaseDetails = { ...(siteData.diseaseDetails || {}) };

let updated = 0;
let missing = [];
let genericKeys = 0;
let listStats = { mgmt: 0, ddx: 0, pitfalls: 0, pearls: 0 };

for (const d of siteData.diseases || []) {
  const batch = Number(d.entryBatch);
  if (batch !== 2 && batch !== 3) continue;
  const raw = contentMap[d.type];
  if (!raw) {
    missing.push(d.type);
    continue;
  }
  const next = normalizeDetail(d, raw);
  const fixed = medicalFixes[d.type] ? applyOverlay(next, medicalFixes[d.type]) : next;
  if (!fixed.overview || !fixed.pathophys || !fixed.epi) {
    missing.push(`${d.type}(incomplete)`);
  }
  for (const k of ['mgmt', 'ddx', 'pitfalls', 'pearls']) {
    listStats[k] += (fixed[k] || []).length;
  }
  for (const [, desc] of fixed.imagingKeys || []) {
    if (isGenericText(desc)) genericKeys++;
  }
  diseaseDetails[d.type] = fixed;
  updated++;
}

siteData.diseaseDetails = diseaseDetails;
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('enrich-batch2-details done');
console.log('  updated:', updated);
console.log('  generic imagingKey desc:', genericKeys);
console.log(
  '  avg list items — mgmt:',
  (listStats.mgmt / updated).toFixed(1),
  'ddx:',
  (listStats.ddx / updated).toFixed(1),
  'pitfalls:',
  (listStats.pitfalls / updated).toFixed(1),
  'pearls:',
  (listStats.pearls / updated).toFixed(1)
);
if (missing.length) console.log('  missing/incomplete:', missing.join(', '));
