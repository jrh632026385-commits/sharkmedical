/** 移除第二批在线补充可疑匹配 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const REMOVE = ['ankle-oa', 'supraspinatus-calc'];

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
for (const type of REMOVE) {
  site.diseaseGalleries[type] = [];
}
site.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(site, null, 2), 'utf8');
console.log('cleared:', REMOVE.join(', '));
