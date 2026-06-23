/**
 * 撤销离线注册表自动匹配（误配过多）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const offlineReport = path.join(root, 'data', 'batch2-offline-registry-supplement.json');

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const report = JSON.parse(fs.readFileSync(offlineReport, 'utf8'));

for (const s of report.supplemented || []) {
  siteData.diseaseGalleries[s.type] = [];
}
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('reverted', (report.supplemented || []).length, 'offline matches');
