/**
 * 生成 site-data-lite.json（疾病+导航，不含 diseaseDetails，加快首屏加载）
 * node scripts/generate-site-lite.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'data', 'site-data.json');
const liteOut = path.join(root, 'data', 'site-data-lite.json');
const detailsOut = path.join(root, 'data', 'site-disease-details.json');

const site = JSON.parse(fs.readFileSync(src, 'utf8'));
const { diseaseDetails, imageAttribRegistry, ...lite } = site;
lite.updatedAt = new Date().toISOString();

fs.writeFileSync(liteOut, JSON.stringify(lite, null, 2), 'utf8');
fs.writeFileSync(detailsOut, JSON.stringify(diseaseDetails || {}, null, 2), 'utf8');

console.log('generate-site-lite done');
console.log('  lite:', (fs.statSync(liteOut).size / 1e6).toFixed(2), 'MB', 'diseases:', lite.diseases?.length);
console.log('  details:', (fs.statSync(detailsOut).size / 1e6).toFixed(2), 'MB');
