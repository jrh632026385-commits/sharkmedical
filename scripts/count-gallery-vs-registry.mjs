import fs from 'fs';

const regJs = fs.readFileSync('image-attrib-registry.js', 'utf8');
const m = regJs.match(/const RAW=`([\s\S]*?)`;/);
const regLines = (m?.[1] || '').trim().split('\n').filter(Boolean);
const regFiles = regLines.map(l => l.split('|')[0]);

const site = JSON.parse(fs.readFileSync('data/site-data.json', 'utf8'));
const g = site.diseaseGalleries || {};

const list = JSON.parse(fs.readFileSync('_imaging-primary-list.json', 'utf8'));
const batch2Types = [];
for (const c of Object.values(list.categories || {})) {
  for (const d of c.diseases || []) batch2Types.push(d.type);
}

const batch2Slots = [];
const batch2Files = new Set();
for (const t of batch2Types) {
  for (const it of g[t] || []) {
    batch2Slots.push(it.file);
    if (it.file) batch2Files.add(it.file);
  }
}

const allSlots = [];
const allFiles = new Set();
for (const items of Object.values(g)) {
  for (const it of items || []) {
    allSlots.push(it.file);
    if (it.file) allFiles.add(it.file);
  }
}

const usedInBatch2 = regFiles.filter(f => batch2Files.has(f));
const unusedInBatch2 = regFiles.filter(f => !batch2Files.has(f));

console.log(JSON.stringify({
  registryJs: regFiles.length,
  siteAttribRegistry: Object.keys(site.imageAttribRegistry || {}).length,
  batch2GallerySlots: batch2Slots.length,
  batch2UniqueFiles: batch2Files.size,
  allGallerySlots: allSlots.length,
  allUniqueFiles: allFiles.size,
  registryUsedInBatch2: usedInBatch2.length,
  registryUnusedInBatch2: unusedInBatch2.length
}, null, 2));
