/**
 * 生成分片站点数据，加快首屏加载：
 * - site-catalog.json   疾病列表 + 导航（~0.5MB）
 * - site-galleries.json 图库 + 授权（后台加载）
 * - site-disease-details.json 疾病详情（后台加载）
 * - site-data-lite.json 兼容旧版（catalog + galleries，压缩单行）
 *
 * node scripts/generate-site-lite.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'data', 'site-data.json');
const catalogOut = path.join(root, 'data', 'site-catalog.json');
const galleriesOut = path.join(root, 'data', 'site-galleries.json');
const liteOut = path.join(root, 'data', 'site-data-lite.json');
const detailsOut = path.join(root, 'data', 'site-disease-details.json');

const site = JSON.parse(fs.readFileSync(src, 'utf8'));
const updatedAt = new Date().toISOString();
const { diseaseDetails, diseaseGalleries, imageAttribRegistry, ...catalog } = site;
catalog.updatedAt = updatedAt;

const galleries = {
  updatedAt,
  diseaseGalleries: diseaseGalleries || {},
  imageAttribRegistry: imageAttribRegistry || {}
};

const lite = { ...catalog, ...galleries };

fs.writeFileSync(catalogOut, JSON.stringify(catalog));
fs.writeFileSync(galleriesOut, JSON.stringify(galleries));
fs.writeFileSync(liteOut, JSON.stringify(lite));
fs.writeFileSync(detailsOut, JSON.stringify(diseaseDetails || {}));

console.log('generate-site-lite done');
console.log('  catalog:', (fs.statSync(catalogOut).size / 1e6).toFixed(2), 'MB', 'diseases:', catalog.diseases?.length);
console.log('  galleries:', (fs.statSync(galleriesOut).size / 1e6).toFixed(2), 'MB');
console.log('  lite:', (fs.statSync(liteOut).size / 1e6).toFixed(2), 'MB');
console.log('  details:', (fs.statSync(detailsOut).size / 1e6).toFixed(2), 'MB');
