/** 从 orthopedics-v2.mjs 恢复第一批 50 条 overview/pathophys 等手工要点 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const overlayPath = path.join(root, 'data', 'textbook-overlays', 'orthopedics-v2.mjs');

const mod = await import(pathToFileURL(overlayPath).href);
const overlays = mod.default || {};
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const batch1 = new Set(
  (siteData.diseases || []).filter(d => Number(d.entryBatch) === 1).map(d => d.type)
);

let n = 0;
for (const [type, patch] of Object.entries(overlays)) {
  if (!batch1.has(type) || !siteData.diseaseDetails?.[type]) continue;
  siteData.diseaseDetails[type] = { ...siteData.diseaseDetails[type], ...patch };
  n++;
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('restore-batch1-overlays done', n);
