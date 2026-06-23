/**
 * 自检第二批影像图库：授权、禁用文件、重复与覆盖率
 * 运行：node scripts/validate-batch2-galleries.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOCKED_FILES, CURATED_GALLERIES, ONLINE_VERIFIED_GALLERIES } from '../data/batch2-gallery-curated.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const listPath = path.join(root, '_imaging-primary-list.json');

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const ALL_DISEASES = process.argv.includes('--all');
const batch2 = ALL_DISEASES
  ? (siteData.diseases || [])
  : (() => {
      const out = [];
      for (const cat of Object.values(list.categories || {})) {
        for (const d of cat.diseases || []) out.push(d);
      }
      return out;
    })();

const galleries = siteData.diseaseGalleries || {};
const registry = siteData.imageAttribRegistry || {};

const errors = [];
const warnings = [];
const fileUsage = new Map();

for (const dis of batch2) {
  const items = galleries[dis.type] || [];
  if (!items.length) continue;
  for (const it of items) {
    if (!it.file) errors.push(`${dis.type}: 缺少 file 字段`);
    if (!registry[it.file]) errors.push(`${dis.type}: 无授权注册 ${it.file}`);
    if (BLOCKED_FILES.has(it.file)) errors.push(`${dis.type}: 禁用文件 ${it.file}`);
    if (!it.caption?.trim()) warnings.push(`${dis.type}: 无 caption — ${it.file}`);
    fileUsage.set(it.file, (fileUsage.get(it.file) || []).concat(dis.type));
  }
  if (items.length && !CURATED_GALLERIES[dis.type]?.length && !ONLINE_VERIFIED_GALLERIES[dis.type]?.length) {
    warnings.push(`${dis.type}: 非精选图库来源，请人工复核`);
  }
}

const withImg = batch2.filter(d => (galleries[d.type] || []).length > 0);
const multi = batch2.filter(d => (galleries[d.type] || []).length >= 2);
const empty = batch2.filter(d => !(galleries[d.type] || []).length);

console.log(ALL_DISEASES ? '=== 全部疾病影像图库自检 ===' : '=== 第二批影像图库自检 ===');
console.log('疾病总数:', batch2.length);
console.log('有图:', withImg.length, `(${((withImg.length / batch2.length) * 100).toFixed(1)}%)`);
console.log('≥2 张:', multi.length);
console.log('无图( SVG 占位):', empty.length);
console.log('影像总数:', withImg.reduce((n, d) => n + (galleries[d.type]?.length || 0), 0));
console.log('授权注册表:', Object.keys(registry).length, '条');
console.log('错误:', errors.length);
console.log('警告:', warnings.length);

if (errors.length) {
  console.log('\n--- 错误 ---');
  errors.slice(0, 30).forEach(e => console.log(' ', e));
}
if (warnings.length) {
  console.log('\n--- 警告 ---');
  warnings.slice(0, 15).forEach(w => console.log(' ', w));
}

console.log('\n--- 有图疾病样例 ---');
withImg.slice(0, 8).forEach(d => {
  const g = galleries[d.type];
  console.log(` ${d.title} (${d.type}): ${g.length} 张 — ${g.map(x => x.caption).join(' | ')}`);
});

process.exitCode = errors.length ? 1 : 0;
