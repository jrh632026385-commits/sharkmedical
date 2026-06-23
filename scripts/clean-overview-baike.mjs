/**
 * 清理全部疾病 overview（流行病学上方的疾病介绍）为百科式表述
 * 运行：node scripts/clean-overview-baike.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { polishDetail, tidyDetail } from './chinese-polish.mjs';
import { loadDetailSources } from '../data/load-detail-sources.mjs';
import {
  cleanOverviewText,
  isGoodBaikeOverview,
  cleanPearls
} from '../data/overview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');

const { detailMap, overlayMod, medicalFixes, batch2Merged } = await loadDetailSources(root);

function pickOverview(dis, det) {
  const candidates = [
    cleanOverviewText(det.overview),
    cleanOverviewText(medicalFixes[dis.type]?.overview),
    cleanOverviewText(overlayMod[dis.type]?.overview),
    cleanOverviewText(batch2Merged[dis.type]?.overview),
    cleanOverviewText(detailMap[dis.type]?.overview),
    cleanOverviewText(batch2Merged[dis.type]?.pathophys),
    cleanOverviewText(medicalFixes[dis.type]?.pathophys),
    cleanOverviewText(det.pathophys)
  ].filter(Boolean);

  for (const c of candidates) {
    if (isGoodBaikeOverview(c)) return c;
  }

  const title = String(dis.title || '').trim();
  const epiLead = String(det.epi || '')
    .split(/[。；,，]/)[0]
    .trim();
  if (title && epiLead && !epiLead.startsWith('好发')) {
    return `${title}。${epiLead}。`;
  }
  if (title && epiLead) return `${title}，${epiLead}。`;
  if (candidates[0] && !/骨肌系统影像诊断|【第/.test(candidates[0])) return candidates[0];
  return title || dis.type;
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let changed = 0;

for (const dis of siteData.diseases || []) {
  const det = siteData.diseaseDetails?.[dis.type];
  if (!det) continue;
  const nextOverview = pickOverview(dis, det);
  const nextPearls = cleanPearls(det.pearls);
  const blob1 = JSON.stringify({ o: det.overview, p: det.pearls });
  det.overview = nextOverview;
  det.pearls = nextPearls;
  siteData.diseaseDetails[dis.type] = tidyDetail(polishDetail(det));
  if (JSON.stringify({ o: det.overview, p: det.pearls }) !== blob1) changed++;
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

const remain = Object.values(siteData.diseaseDetails).filter(
  d => !isGoodBaikeOverview(d?.overview || '')
).length;

console.log('clean-overview-baike done');
console.log('  changed:', changed);
console.log('  remaining bad overview:', remain);
