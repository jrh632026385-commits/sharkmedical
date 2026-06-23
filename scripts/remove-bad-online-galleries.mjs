/**
 * 移除 4 条在线补充可疑匹配
 * node scripts/remove-bad-online-galleries.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const reportPath = path.join(root, 'data', 'batch2-gallery-online-supplement.json');

const REMOVE_TYPES = ['proxfibula', 'supraspinatus-calc', 'sft', 'schwannoma'];

const TITLES = {
  proxfibula: '腓骨近端骨折',
  'supraspinatus-calc': '钙化性肌腱炎',
  sft: '孤立性纤维瘤',
  schwannoma: '神经鞘瘤'
};

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
siteData.diseaseGalleries = siteData.diseaseGalleries || {};

const removed = [];
for (const type of REMOVE_TYPES) {
  const prev = siteData.diseaseGalleries[type] || [];
  if (prev.length) {
    removed.push({ type, title: TITLES[type], files: prev.map(i => i.file) });
  }
  siteData.diseaseGalleries[type] = [];
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  report.supplemented = (report.supplemented || []).filter(e => !REMOVE_TYPES.includes(e.type));
  report.stillEmpty = report.stillEmpty || [];
  for (const type of REMOVE_TYPES) {
    if (!report.stillEmpty.some(e => e.type === type)) {
      report.stillEmpty.push({ type, title: TITLES[type] });
    }
  }
  report.removedBadMatches = removed;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
}

console.log('已清空图库:');
removed.forEach(r => console.log(`  ${r.type} (${r.title}): ${r.files.join(', ')}`));
console.log('done');
