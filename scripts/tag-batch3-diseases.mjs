/**
 * 将扩展录入的 62 条标记为第三批（entryBatch=3）
 * node scripts/tag-batch3-diseases.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const batch3Path = path.join(root, 'data', 'batch2-details', 'batch3-remaining.mjs');

const batch3Mod = await import(pathToFileURL(batch3Path).href);
const batch3Types = new Set(Object.keys(batch3Mod.default || {}));

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let n = 0;
for (const d of siteData.diseases || []) {
  if (!batch3Types.has(d.type)) continue;
  d.entryBatch = 3;
  d.entryBatchLabel = '第三批录入疾病';
  n++;
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

const b1 = siteData.diseases.filter(d => Number(d.entryBatch) === 1).length;
const b2 = siteData.diseases.filter(d => Number(d.entryBatch) === 2).length;
const b3 = siteData.diseases.filter(d => Number(d.entryBatch) === 3).length;
console.log('tag-batch3-diseases done', n);
console.log('  batch1:', b1, 'batch2:', b2, 'batch3:', b3, 'total:', siteData.diseases.length);
