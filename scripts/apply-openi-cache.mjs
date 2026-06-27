/** 用 ~/.shark-medical/openi-buckets.json 快速回填已知 PMC bucket */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import {
  buildBucketMapFromGalleries,
  buildOpeniImageUrl,
  pmcFromOpeniFile
} from '../data/gallery-image-url.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const CACHE_FILE = path.join(os.homedir(), '.shark-medical', 'openi-buckets.json');

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const bucketMap = buildBucketMapFromGalleries(site.diseaseGalleries);
if (fs.existsSync(CACHE_FILE)) {
  for (const [pmc, bucket] of Object.entries(JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')))) {
    if (pmc && bucket) bucketMap.set(pmc, String(bucket));
  }
}

let fixed = 0;
for (const gallery of Object.values(site.diseaseGalleries || {})) {
  if (!Array.isArray(gallery)) continue;
  for (const item of gallery) {
    const file = String(item.file || '');
    if (!file.startsWith('openi__') || item.url) continue;
    const pmc = pmcFromOpeniFile(file);
    const bucket = pmc ? bucketMap.get(pmc) : '';
    const url = bucket ? buildOpeniImageUrl(file, bucket) : '';
    if (!url) continue;
    item.url = url;
    fixed++;
    if (!site.imageAttribRegistry) site.imageAttribRegistry = {};
    site.imageAttribRegistry[file] = {
      ...(site.imageAttribRegistry[file] || item.attrib || {}),
      imageUrl: url
    };
  }
}

site.updatedAt = new Date().toISOString();
const tmp = `${dataPath}.tmp-${process.pid}`;
fs.writeFileSync(tmp, JSON.stringify(site, null, 2), 'utf8');
fs.renameSync(tmp, dataPath);
console.log(`apply-openi-cache: fixed ${fixed} items from ${bucketMap.size} buckets`);
