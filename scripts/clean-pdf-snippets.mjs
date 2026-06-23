/**
 * 清理 imagingKeys / pearls / pathophys 中的 PDF 摘抄与缩写嵌套残留
 * 运行：node scripts/clean-pdf-snippets.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { polishDetail, tidyDetail } from './chinese-polish.mjs';
import { fixDetail } from '../data/abbrev-fix.mjs';
import { loadDetailSources } from '../data/load-detail-sources.mjs';
import {
  cleanOverviewText,
  cleanPearls,
  cleanImagingKeys,
  cleanPdfSnippet,
  isPdfJunk,
  isGoodBaikeOverview
} from '../data/overview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');

const { detailMap, overlayMod, medicalFixes, batch2Merged } = await loadDetailSources(root);

function fallbackImagingKeys(type) {
  for (const src of [medicalFixes[type], overlayMod[type], batch2Merged[type], detailMap[type]]) {
    if (src?.imagingKeys?.length) return src.imagingKeys;
  }
  return null;
}

function fallbackOverview(type, dis, det) {
  const candidates = [
    medicalFixes[type]?.overview,
    overlayMod[type]?.overview,
    batch2Merged[type]?.overview,
    detailMap[type]?.overview,
    batch2Merged[type]?.pathophys,
    medicalFixes[type]?.pathophys
  ]
    .map(cleanOverviewText)
    .filter(Boolean);
  for (const c of candidates) {
    if (isGoodBaikeOverview(c)) return c;
  }
  const title = String(dis.title || '').trim();
  const epiLead = String(det.epi || '')
    .split(/[。；,，]/)[0]
    .trim();
  if (title && epiLead && epiLead.length >= 6) return `${title}。${epiLead}。`;
  return title || type;
}

function fallbackPathophys(type, det) {
  for (const src of [medicalFixes[type], batch2Merged[type], overlayMod[type]]) {
    const p = cleanPdfSnippet(src?.pathophys || '');
    if (p && !isPdfJunk(p) && p.length >= 12) return p;
  }
  const p = cleanPdfSnippet(det.pathophys || '');
  return isPdfJunk(p) ? '' : p;
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let imgChanged = 0;
let ovChanged = 0;
let pearlChanged = 0;
let pathChanged = 0;

for (const dis of siteData.diseases || []) {
  const type = dis.type;
  const det = siteData.diseaseDetails?.[type];
  if (!det) continue;

  const before = JSON.stringify({
    o: det.overview,
    p: det.pathophys,
    k: det.imagingKeys,
    r: det.pearls
  });

  const fbKeys = fallbackImagingKeys(type);
  const fixKeys = medicalFixes[type]?.imagingKeys;
  const sourceKeys = fixKeys?.length >= 3 ? fixKeys : det.imagingKeys;
  det.imagingKeys = cleanImagingKeys(sourceKeys, fbKeys);

  const fixPearls = cleanPearls(medicalFixes[type]?.pearls);
  det.pearls = cleanPearls(det.pearls);
  if (medicalFixes[type]?.pearls?.length && fixPearls.length) {
    det.pearls = fixPearls;
  } else if (!det.pearls?.length) {
    for (const src of [medicalFixes[type], overlayMod[type], batch2Merged[type]]) {
      const fb = cleanPearls(src?.pearls);
      if (fb.length) {
        det.pearls = fb;
        break;
      }
    }
  }

  const nextPath = fallbackPathophys(type, det);
  if (nextPath && nextPath !== det.pathophys) {
    det.pathophys = nextPath;
    pathChanged++;
  } else if (isPdfJunk(det.pathophys)) {
    det.pathophys = cleanPdfSnippet(det.pathophys);
  }

  if (!isGoodBaikeOverview(det.overview)) {
    det.overview = fallbackOverview(type, dis, det);
    ovChanged++;
  } else {
    det.overview = cleanOverviewText(det.overview);
  }

  siteData.diseaseDetails[type] = fixDetail(tidyDetail(polishDetail(det)));

  const after = JSON.stringify({
    o: siteData.diseaseDetails[type].overview,
    p: siteData.diseaseDetails[type].pathophys,
    k: siteData.diseaseDetails[type].imagingKeys,
    r: siteData.diseaseDetails[type].pearls
  });
  if (before !== after) {
    if (JSON.stringify(JSON.parse(before).k) !== JSON.stringify(JSON.parse(after).k)) imgChanged++;
    if (JSON.stringify(JSON.parse(before).r) !== JSON.stringify(JSON.parse(after).r)) pearlChanged++;
  }
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

const details = siteData.diseaseDetails;
const badImg = Object.values(details).filter(d =>
  (d.imagingKeys || []).some(row => isPdfJunk(row[1]))
).length;
const badPearl = Object.values(details).filter(d =>
  (d.pearls || []).some(p => isPdfJunk(p))
).length;
const badOv = Object.values(details).filter(d => !isGoodBaikeOverview(d?.overview)).length;
const nested = JSON.stringify(details).match(/([A-Z]{2,8})（\1（/g);

console.log('clean-pdf-snippets done');
console.log('  overview fixed:', ovChanged);
console.log('  pathophys fixed:', pathChanged);
console.log('  imagingKeys diseases touched:', imgChanged);
console.log('  pearls diseases touched:', pearlChanged);
console.log('  remaining bad imagingKeys:', badImg);
console.log('  remaining bad pearls:', badPearl);
console.log('  remaining bad overview:', badOv);
console.log('  nested abbrev (approx):', nested ? nested.length : 0);
