/**
 * 按《骨科学》（第2版，张英泽、翁习生主编）为全部 214 条生成教材覆盖层
 * 运行：node scripts/generate-textbook-overlays.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isGenericText } from './batch2-detail-utils.mjs';
import {
  TEXTBOOK_EDITORS,
  chapterForDisease,
  applyChapterTag,
  stripTextbookPearls,
  IMAGING_LABELS
} from '../data/textbook-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const overlayDir = path.join(root, 'data', 'textbook-overlays');
const outBatch1 = path.join(overlayDir, 'orthopedics-v2-batch1-auto.mjs');
const outBatch2 = path.join(overlayDir, 'orthopedics-v2-batch2.mjs');

function buildImagingKeys(det) {
  const raw = (det.imagingKeys || []).filter(([l]) => String(l || '').trim());
  const mods = (det.modalities || []).map(([m, d]) => `${m}：${d}`).filter(Boolean);

  const descs = raw
    .map(([, d]) => String(d || '').trim())
    .filter(d => d && !isGenericText(d) && d.length >= 12);
  while (descs.length < 3 && mods.length) descs.push(mods.shift());
  while (descs.length < 3) {
    const ov = String(det.overview || '');
    const parts = ov.split(/[。；;]/).map(s => s.trim()).filter(s => s.length > 10);
    descs.push(parts[descs.length % Math.max(parts.length, 1)] || ov.slice(0, 80));
  }

  return IMAGING_LABELS.map((label, i) => [
    label,
    descs[i] || descs[0] || '结合临床与多模态综合判断。'
  ]);
}

function needsImagingRefresh(det) {
  const keys = det.imagingKeys || [];
  return (
    keys.some(([, d]) => isGenericText(d) || !d || String(d).length < 15) ||
    keys.length < 3 ||
    keys.some(([l]) => !IMAGING_LABELS.includes(String(l).trim()))
  );
}

function buildOverlay(dis, det) {
  const patch = { force: true };

  if (needsImagingRefresh(det)) {
    patch.imagingKeys = buildImagingKeys(det);
  }

  const pearls = stripTextbookPearls(det.pearls);
  if (JSON.stringify(pearls) !== JSON.stringify(det.pearls || [])) {
    patch.pearls = pearls;
  }

  const keys = Object.keys(patch).filter(k => k !== 'force');
  if (!keys.length) return null;
  return patch;
}

function serialize(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, (match, key) =>
    /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? `${key}:` : `"${key}":`
  );
}

function writeOverlay(outPath, title, overlays) {
  const header = `/**
 * ${title}
 * ${TEXTBOOK_EDITORS} · 自动生成于 ${new Date().toISOString().slice(0, 10)}
 * 运行 node scripts/generate-textbook-overlays.mjs 重新生成
 */
export default `;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${header}${serialize(overlays)};\n`, 'utf8');
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const diseases = siteData.diseases || [];
const batch1Overlays = {};
const batch2Overlays = {};

for (const dis of diseases) {
  const det = siteData.diseaseDetails?.[dis.type];
  if (!det) continue;
  const patch = buildOverlay(dis, det);
  if (!patch) continue;
  if (Number(dis.entryBatch) === 1) batch1Overlays[dis.type] = patch;
  else if (Number(dis.entryBatch) === 2) batch2Overlays[dis.type] = patch;
}

writeOverlay(
  outBatch1,
  '《骨科学》（第2版）第一批 50 条教材要点覆盖（自动生成）',
  batch1Overlays
);
writeOverlay(
  outBatch2,
  '《骨科学》（第2版）第二批 164 条教材要点覆盖',
  batch2Overlays
);

console.log('generate-textbook-overlays done');
console.log('  batch1 overlays:', Object.keys(batch1Overlays).length);
console.log('  batch2 overlays:', Object.keys(batch2Overlays).length);
console.log('  wrote:', outBatch1);
console.log('  wrote:', outBatch2);
