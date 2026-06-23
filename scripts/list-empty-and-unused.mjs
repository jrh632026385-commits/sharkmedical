import fs from 'fs';
import { CURATED_GALLERIES } from '../data/batch2-gallery-curated.mjs';

const site = JSON.parse(fs.readFileSync('data/site-data.json', 'utf8'));
const list = JSON.parse(fs.readFileSync('_imaging-primary-list.json', 'utf8'));
const reg = (fs.readFileSync('image-attrib-registry.js', 'utf8').match(/const RAW=`([\s\S]*?)`;/)?.[1] || '')
  .trim()
  .split('\n')
  .map(l => l.split('|')[0]);

const g = site.diseaseGalleries || {};
const used = new Set();
for (const items of Object.values(g)) {
  for (const it of items || []) if (it.file) used.add(it.file);
}

const empty = [];
for (const c of Object.values(list.categories || {})) {
  for (const d of c.diseases || []) {
    if (!(g[d.type] || []).length) empty.push(d);
  }
}

console.log('empty', empty.length);
empty.forEach(d => console.log(`${d.type}\t${d.en || d.title}`));
console.log('\nunused', reg.filter(f => !used.has(f)).length);
reg.filter(f => !used.has(f)).forEach(f => console.log(f));
