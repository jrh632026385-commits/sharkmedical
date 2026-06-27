/**
 * 回填图库缺失的 image url（Open-i 等）
 * node scripts/backfill-gallery-urls.mjs [--search] [--limit N]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from '../data/wikimedia-api.mjs';
import { searchOpenI } from '../data/openi-api.mjs';
import {
  buildBucketMapFromGalleries,
  buildOpeniImageUrl,
  openiBasename,
  pmcFromOpeniFile
} from '../data/gallery-image-url.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const USE_SEARCH = process.argv.includes('--search');
const LIMIT = (() => {
  const i = process.argv.indexOf('--limit');
  return i >= 0 ? Number(process.argv[i + 1]) : 0;
})();

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function headOk(url) {
  try {
    const dispatcher = await getDispatcher();
    const res = await undiciFetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'SharkMedical/1.0 backfill' },
      dispatcher
    });
    const ct = res.headers.get('content-type') || '';
    return res.ok && !/text\/html/i.test(ct);
  } catch {
    return false;
  }
}

function saveSite(site) {
  site.updatedAt = new Date().toISOString();
  const payload = JSON.stringify(site, null, 2);
  const tmp = `${dataPath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, payload, 'utf8');
  fs.renameSync(tmp, dataPath);
}

async function resolveBySearch(file, item, cache) {
  if (cache.has(file)) return cache.get(file);
  const caption = String(item?.caption || item?.attrib?.title || '')
    .replace(/^[^·]+·\s*[^·]+·\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
  const queries = [
    caption.slice(0, 100),
    openiBasename(file).replace(/\.(png|jpe?g|gif|webp)$/i, '').replace(/_/g, ' ').slice(0, 80)
  ].filter(Boolean);

  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 20, timeoutMs: 35000 });
      const hit = (list || []).find(h => h.fileId === file);
      if (hit?.imageUrl && (await headOk(hit.imageUrl))) {
        cache.set(file, hit.imageUrl);
        return hit.imageUrl;
      }
    } catch {
      /* next query */
    }
    await sleep(400);
  }
  cache.set(file, '');
  return '';
}

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const bucketMap = buildBucketMapFromGalleries(site.diseaseGalleries);
const searchCache = new Map();
let itemFixed = 0;
let regFixed = 0;
let wikiPageFixed = 0;
let searchFixed = 0;
let scanned = 0;
let searchTried = 0;

for (const gallery of Object.values(site.diseaseGalleries || {})) {
  if (!Array.isArray(gallery)) continue;
  for (const item of gallery) {
    scanned++;
    if (item.url && /commons\.wikimedia\.org\/wiki\/File:/i.test(item.url)) {
      delete item.url;
      wikiPageFixed++;
    }

    const file = String(item.file || '');
    if (!file.startsWith('openi__') || item.url) continue;

    const pmc = pmcFromOpeniFile(file);
    const bucket = bucketMap.get(pmc);
    let url = '';
    if (bucket) {
      const candidate = buildOpeniImageUrl(file, bucket);
      if (candidate && (await headOk(candidate))) url = candidate;
    }

    if (!url && USE_SEARCH && (LIMIT <= 0 || searchTried < LIMIT)) {
      searchTried++;
      url = await resolveBySearch(file, item, searchCache);
      if (url) searchFixed++;
      if (searchTried % 25 === 0) {
        console.log(`  search progress ${searchTried}…`);
        saveSite(site);
      }
    }

    if (!url) continue;

    item.url = url;
    itemFixed++;
    const um = url.match(/\/imgs\/512\/(\d+)\/(\d+)\//);
    if (um && pmc) bucketMap.set(pmc, um[1]);
    if (!site.imageAttribRegistry) site.imageAttribRegistry = {};
    const reg = site.imageAttribRegistry[file] || item.attrib || {};
    site.imageAttribRegistry[file] = { ...reg, imageUrl: url };
    regFixed++;
  }
}

saveSite(site);
console.log(
  `backfill-gallery-urls done: openi ${itemFixed} (search ${searchFixed}), registry ${regFixed}, wiki-page ${wikiPageFixed}, scanned ${scanned}, searchTried ${searchTried}`
);
