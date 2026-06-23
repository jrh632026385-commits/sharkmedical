/**
 * 按四本参考书更新 site-data.json（不再写入章节标签/页码）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { polishDetail, tidyDetail } from './chinese-polish.mjs';
import { TEXTBOOK_REF, SOURCE_BOOKS, IMAGING_LABELS } from '../data/textbook-config.mjs';
import { cleanOverviewText, cleanPearls, cleanImagingKeys } from '../data/overview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const extractsPath = path.join(root, 'data', 'pdf-sources', 'disease-extracts.json');
const fixPath = path.join(root, 'data', 'batch2-details', 'medical-fixes.mjs');

const medicalFixes = fs.existsSync(fixPath)
  ? (await import(`${pathToFileURL(fixPath).href}?t=${Date.now()}`)).default || {}
  : {};

function applyExtract(det, ex, dis) {
  const out = { ...det };
  out.overview = cleanOverviewText(det.overview || dis.desc || dis.title || '');

  if (ex.matched && ex.imagingKeys && ex.score >= 15) {
    out.imagingKeys = cleanImagingKeys(
      ex.imagingKeys.map(([l, d]) => [l, String(d).slice(0, 180)]),
      det.imagingKeys
    );
  } else if (out.imagingKeys?.length >= 3) {
    out.imagingKeys = cleanImagingKeys(out.imagingKeys);
  }

  if (ex.modalities?.length && ex.score >= 15) {
    out.modalities = ex.modalities;
  }

  out.pearls = cleanPearls(det.pearls);

  out.sources = SOURCE_BOOKS.map(b => ({
    book: b.cite,
    editors: b.editors,
    publisher: b.publisher
  }));

  return out;
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const extracts = JSON.parse(fs.readFileSync(extractsPath, 'utf8'));
const batch2Types = new Set(
  (siteData.diseases || []).filter(d => Number(d.entryBatch) === 2).map(d => d.type)
);

let updated = 0;
let matched = 0;
const details = { ...(siteData.diseaseDetails || {}) };

for (const dis of siteData.diseases || []) {
  const det = details[dis.type];
  const ex = extracts[dis.type];
  if (!det || !ex) continue;

  let next = applyExtract(det, ex, dis);

  if (batch2Types.has(dis.type) && medicalFixes[dis.type]) {
    const fix = { ...medicalFixes[dis.type] };
    if (fix.overview) fix.overview = cleanOverviewText(fix.overview);
    if (ex.matched) {
      delete fix.imagingKeys;
    }
    next = tidyDetail(polishDetail({ ...next, ...fix }));
  } else {
    next = tidyDetail(polishDetail(next));
  }

  if (JSON.stringify(next) !== JSON.stringify(det)) updated++;
  if (ex.matched) matched++;
  details[dis.type] = next;
}

siteData.diseaseDetails = details;
siteData.textbookRef = TEXTBOOK_REF;
siteData.sourceBooks = SOURCE_BOOKS.map(({ file, textExtractable, ...rest }) => rest);
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('apply-pdf-books-update done');
console.log('  updated:', updated);
console.log('  msk matched:', matched, '/', siteData.diseases.length);
