import { readGalleriesFile } from './contentSlices.js';
import {
  buildBucketMapFromGalleries,
  buildOpeniImageUrl,
  openiBasename,
  pmcFromOpeniFile
} from '../../data/gallery-image-url.mjs';
import { searchOpenI } from '../../data/openi-api.mjs';
import {
  getCachedPmcBucket,
  probeOpeniBucket,
  rememberPmcBucket,
  resolveOpeniFileUrl,
  setKnownOpeniBuckets
} from './openiBucketProbe.js';

let bucketMap = null;
let bucketMapAt = 0;
const RESOLVE_CACHE = new Map();

function getBucketMap() {
  const now = Date.now();
  if (!bucketMap || now - bucketMapAt > 60_000) {
    const gal = readGalleriesFile();
    bucketMap = buildBucketMapFromGalleries(gal?.diseaseGalleries || {});
    setKnownOpeniBuckets([...bucketMap.values()]);
    bucketMapAt = now;
  }
  return bucketMap;
}

export function invalidateOpeniResolveCache() {
  bucketMap = null;
  RESOLVE_CACHE.clear();
}

export async function resolveOpeniImageUrl(file) {
  const key = String(file || '').trim();
  if (!key.startsWith('openi__')) return '';
  if (RESOLVE_CACHE.has(key)) return RESOLVE_CACHE.get(key);

  const pmc = pmcFromOpeniFile(key);
  const map = getBucketMap();
  const bucket = (pmc && map.get(pmc)) || getCachedPmcBucket(pmc);

  if (bucket) {
    const url = await resolveOpeniFileUrl(key, bucket);
    if (url) {
      rememberPmcBucket(pmc, bucket);
      RESOLVE_CACHE.set(key, url);
      return url;
    }
  }

  const probed = await probeOpeniBucket(pmc, key);
  if (probed.url) {
    if (pmc && probed.bucket) {
      map.set(pmc, probed.bucket);
      rememberPmcBucket(pmc, probed.bucket);
    }
    RESOLVE_CACHE.set(key, probed.url);
    return probed.url;
  }

  if (pmc) {
    try {
      const { list } = await searchOpenI(openiBasename(key).replace(/\.(png|jpe?g|gif|webp)$/i, ''), {
        limit: 16,
        timeoutMs: 20000
      });
      const base = openiBasename(key);
      const hit = (list || []).find(h => h.fileId === key || openiBasename(h.fileId) === base);
      if (hit?.imageUrl) {
        const um = hit.imageUrl.match(/\/imgs\/512\/(\d+)\/(\d+)\//);
        if (um && pmc) rememberPmcBucket(pmc, um[1]);
        RESOLVE_CACHE.set(key, hit.imageUrl);
        return hit.imageUrl;
      }
    } catch {
      /* fall through */
    }
  }

  RESOLVE_CACHE.set(key, '');
  return '';
}
