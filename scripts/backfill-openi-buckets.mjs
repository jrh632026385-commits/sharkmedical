/**
 * 为缺失 url 的 Open-i 图库条目探测 CDN bucket 并回填。
 * node scripts/backfill-openi-buckets.mjs [--limit N] [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import {
  buildBucketMapFromGalleries,
  buildOpeniImageUrl,
  pmcFromOpeniFile
} from '../data/gallery-image-url.mjs';
import {
  getCachedPmcBucket,
  probeOpeniBucket,
  rememberPmcBucket,
  setKnownOpeniBuckets
} from '../server/lib/openiBucketProbe.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const CACHE_FILE = path.join(os.homedir(), '.shark-medical', 'openi-buckets.json');
const DRY = process.argv.includes('--dry-run');
const LIMIT = (() => {
  const i = process.argv.indexOf('--limit');
  return i >= 0 ? Number(process.argv[i + 1]) : 0;
})();

function saveSite(site) {
  if (DRY) return;
  site.updatedAt = new Date().toISOString();
  const payload = JSON.stringify(site, null, 2);
  const tmp = `${dataPath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, payload, 'utf8');
  fs.renameSync(tmp, dataPath);
}

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const bucketMap = buildBucketMapFromGalleries(site.diseaseGalleries);
if (fs.existsSync(CACHE_FILE)) {
  for (const [pmc, bucket] of Object.entries(JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')))) {
    if (pmc && bucket && !bucketMap.has(pmc)) bucketMap.set(pmc, String(bucket));
  }
}
setKnownOpeniBuckets([...bucketMap.values()]);

const missingByPmc = new Map();
for (const gallery of Object.values(site.diseaseGalleries || {})) {
  if (!Array.isArray(gallery)) continue;
  for (const item of gallery) {
    const file = String(item.file || '');
    if (!file.startsWith('openi__') || item.url) continue;
    const pmc = pmcFromOpeniFile(file);
    if (!pmc) continue;
    if (!missingByPmc.has(pmc)) missingByPmc.set(pmc, []);
    missingByPmc.get(pmc).push(item);
  }
}

let pmcs = [...missingByPmc.keys()];
if (LIMIT > 0) pmcs = pmcs.slice(0, LIMIT);

let fixed = 0;
let probed = 0;

console.log(`backfill-openi-buckets: ${pmcs.length} PMC groups, dry=${DRY}`);

for (const pmc of pmcs) {
  const items = missingByPmc.get(pmc);
  let bucket = bucketMap.get(pmc) || getCachedPmcBucket(pmc) || '';
  probed++;

  if (!bucket) {
    const sample = items[0]?.file;
    process.stdout.write(`  probe ${pmc}… `);
    const hit = await probeOpeniBucket(pmc, sample);
    bucket = hit.bucket || '';
    console.log(bucket || 'miss');
    if (bucket) bucketMap.set(pmc, bucket);
  }

  if (!bucket) {
    console.warn('  skip', pmc, `(${items.length} items)`);
    continue;
  }

  rememberPmcBucket(pmc, bucket);

  let groupFixed = 0;
  for (const item of items) {
    const url = buildOpeniImageUrl(item.file, bucket);
    if (!url) continue;
    item.url = url;
    fixed++;
    groupFixed++;
    if (!site.imageAttribRegistry) site.imageAttribRegistry = {};
    const reg = site.imageAttribRegistry[item.file] || item.attrib || {};
    site.imageAttribRegistry[item.file] = { ...reg, imageUrl: url };
  }

  if (groupFixed) console.log(`  ${pmc} +${groupFixed}`);

  if (probed % 10 === 0) {
    console.log(`  progress ${probed}/${pmcs.length}, fixed ${fixed}`);
    saveSite(site);
  }
}

saveSite(site);
console.log(`done: probed ${probed} PMC groups, fixed ${fixed} gallery items`);

const exportPath = path.join(root, 'data', 'openi-bucket-map.json');
const exportMap = Object.fromEntries(bucketMap.entries());
fs.writeFileSync(exportPath, JSON.stringify(exportMap, null, 2));
console.log(`exported ${Object.keys(exportMap).length} PMC buckets -> data/openi-bucket-map.json`);
