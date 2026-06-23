/**
 * 从 index.html 的 detailMap/detailExtended 恢复第一批 50 条的 modalities（及 imagingKeys），
 * 覆盖 books-pass 写入的通用占位描述。
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const dataPath = path.join(root, 'data', 'site-data.json');

const GENERIC_RE = /见书中相关章节|首选筛查或随访|骨窗\/软组织窗评估骨折|待补充影像说明/;

function extractLiteral(expr) {
  expr = expr.trim();
  const open = expr[0];
  const close = open === '[' ? ']' : open === '{' ? '}' : null;
  if (!close) return expr;
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === open) depth++;
    else if (expr[i] === close) {
      depth--;
      if (depth === 0) return expr.slice(0, i + 1);
    }
  }
  return expr;
}

function sliceConst(html, name, nextMarker) {
  const re = new RegExp(`(?:const|let) ${name}=`);
  const start = html.search(re);
  if (start === -1) throw new Error(`无法在 index.html 中找到 ${name}`);
  const end = html.indexOf(nextMarker, start + 1);
  const chunk = html.slice(start, end).trim();
  const expr = chunk.replace(new RegExp(`^(?:const|let) ${name}=`), '').trim();
  return extractLiteral(expr);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const sandbox = {};
vm.createContext(sandbox);
for (const [name, next] of [
  ['detailMap', 'const detailExtended='],
  ['detailExtended', '/* ---------- mini SVG']
]) {
  vm.runInContext(`${name}=${sliceConst(html, name, next)}`, sandbox, { timeout: 8000 });
}

const embedded = {};
for (const k of new Set([...Object.keys(sandbox.detailMap || {}), ...Object.keys(sandbox.detailExtended || {})])) {
  embedded[k] = { ...(sandbox.detailMap[k] || {}), ...(sandbox.detailExtended[k] || {}) };
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const batch1 = new Set(
  (siteData.diseases || []).filter(d => Number(d.entryBatch) === 1).map(d => d.type)
);

let fixed = 0;
for (const type of batch1) {
  const src = embedded[type];
  const det = siteData.diseaseDetails?.[type];
  if (!src || !det) continue;
  const curMods = (det.modalities || []).map(([, d]) => String(d)).join(' ');
  const needsFix = !det.modalities?.length || GENERIC_RE.test(curMods);
  if (!needsFix) continue;
  if (src.modalities?.length) {
    det.modalities = src.modalities.map(([m, d]) => [m, String(d).trim()]);
    fixed++;
  }
  if (src.imagingKeys?.length && (!det.imagingKeys?.length || GENERIC_RE.test(det.imagingKeys.map(([, d]) => d).join('')))) {
    det.imagingKeys = src.imagingKeys.map(([l, d]) => [l, String(d).trim()]);
  }
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('restore-batch1-modalities done, fixed:', fixed);
