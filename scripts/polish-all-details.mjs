/**
 * 对 site-data.json 全部 diseaseDetails 做中文化润色 + 通顺性整理（含第一批与第二批）
 * 第二批在润色后叠加 medical-fixes，保证医学修正不被破坏。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { polishDetail, tidyDetail, countDetailEnglishWords } from './chinese-polish.mjs';
import { fixDetail } from '../data/abbrev-fix.mjs';
import { cleanOverviewText, cleanPearls } from '../data/overview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const fixPath = path.join(root, 'data', 'batch2-details', 'medical-fixes.mjs');

function applyOverlay(base, overlay) {
  if (!overlay) return { ...base };
  const out = { ...base };
  for (const [k, v] of Object.entries(overlay)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      out[k] = v.map(item => (Array.isArray(item) ? [...item] : item));
    } else if (typeof v === 'string' && v.trim()) {
      out[k] = v.trim();
    }
  }
  return out;
}

const medicalFixes = fs.existsSync(fixPath)
  ? (await import(pathToFileURL(fixPath).href)).default || {}
  : {};

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const details = siteData.diseaseDetails || {};
const batchExtTypes = new Set(
  (siteData.diseases || []).filter(d => {
    const b = Number(d.entryBatch);
    return b === 2 || b === 3;
  }).map(d => d.type)
);

let before = 0;
let after = 0;
let polished = 0;
let cnSpaceBefore = 0;
let cnSpaceAfter = 0;

for (const [type, det] of Object.entries(details)) {
  const blob = JSON.stringify(det);
  before += countDetailEnglishWords(det);
  cnSpaceBefore += (blob.match(/[\u4e00-\u9fff] [\u4e00-\u9fff]/g) || []).length;

  let next = polishDetail(det);
  if (batchExtTypes.has(type) && medicalFixes[type]) {
    const fix = { ...medicalFixes[type] };
    if (fix.overview) fix.overview = cleanOverviewText(fix.overview);
    next = applyOverlay(next, fix);
  }
  if (next.pearls) next.pearls = cleanPearls(next.pearls);
  next = fixDetail(tidyDetail(next));

  const blob2 = JSON.stringify(next);
  after += countDetailEnglishWords(next);
  cnSpaceAfter += (blob2.match(/[\u4e00-\u9fff] [\u4e00-\u9fff]/g) || []).length;
  if (blob !== blob2) polished++;
  details[type] = next;
}

siteData.diseaseDetails = details;
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('polish-all-details done');
console.log('  types polished:', polished, '/', Object.keys(details).length);
console.log('  english words (approx):', before, '->', after);
console.log('  cn-char spaces:', cnSpaceBefore, '->', cnSpaceAfter);
