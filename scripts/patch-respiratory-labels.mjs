/**
 * 呼吸系统：sub 改为中文 sevtext，分类导航去掉 emoji
 * node scripts/patch-respiratory-labels.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RESPIRATORY_NAV_GROUPS } from '../data/respiratory-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data', 'site-data.json');

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let patchedSub = 0;

for (const d of siteData.diseases || []) {
  if (d.sys !== 'respiratory') continue;
  if (d.sevtext && d.sub !== d.sevtext) {
    d.sub = d.sevtext;
    patchedSub++;
  }
}

const navGroups = { ...RESPIRATORY_NAV_GROUPS };
for (const key of Object.keys(navGroups)) {
  navGroups[key] = { ...navGroups[key], icon: '' };
}
siteData.RESPIRATORY_NAV_GROUPS = navGroups;
siteData.updatedAt = new Date().toISOString();

fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('patch-respiratory-labels done');
console.log('  sub -> sevtext:', patchedSub);
console.log('  nav groups icons cleared:', Object.keys(navGroups).length);
