import fs from 'fs';
import path from 'path';
import os from 'os';
import { fetch as undiciFetch } from 'undici';
import { fileURLToPath } from 'url';
import { getDispatcher } from '../../data/wikimedia-api.mjs';
import { buildOpeniImageUrl, openiBasename, pmcFromOpeniFile } from '../../data/gallery-image-url.mjs';
import { runInPool } from './downloadPool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_BUCKET_FILE = path.join(__dirname, '../../data/openi-bucket-map.json');
const CACHE_FILE = process.env.SHARK_OPENI_BUCKETS_FILE
  || path.join(
    process.env.VERCEL ? os.tmpdir() : os.homedir(),
    process.env.VERCEL ? 'shark-openi-buckets.json' : '.shark-medical/openi-buckets.json'
  );
let pmcBucketCache = loadCache();
let knownBuckets = null;

function loadProjectBuckets() {
  try {
    return JSON.parse(fs.readFileSync(PROJECT_BUCKET_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function loadCache() {
  const merged = { ...loadProjectBuckets() };
  try {
    Object.assign(merged, JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')));
  } catch {
    /* optional local cache */
  }
  return new Map(Object.entries(merged));
}

function saveCache() {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.fromEntries(pmcBucketCache), null, 2));
}

export function rememberPmcBucket(pmc, bucket) {
  const key = String(pmc || '').trim();
  const val = String(bucket || '').trim();
  if (!key || !val) return;
  if (pmcBucketCache.get(key) === val) return;
  pmcBucketCache.set(key, val);
  saveCache();
}

export function getCachedPmcBucket(pmc) {
  return pmcBucketCache.get(String(pmc || '').trim()) || '';
}

export function setKnownOpeniBuckets(buckets) {
  knownBuckets = [...new Set((buckets || []).map(b => Number(b)).filter(n => Number.isFinite(n) && n >= 0 && n < 512))];
}

function getKnownBuckets() {
  if (knownBuckets?.length) return knownBuckets;
  return [...Array(512).keys()];
}

async function headImageUrl(url) {
  try {
    const dispatcher = await getDispatcher();
    const res = await undiciFetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'SharkMedical/1.0 openi-probe', Accept: 'image/*' },
      redirect: 'follow',
      dispatcher
    });
    const ct = res.headers.get('content-type') || '';
    return res.ok && /image\//i.test(ct);
  } catch {
    return false;
  }
}

async function tryBucketForFile(pmc, file, bucket, foundRef) {
  if (foundRef.url) return null;
  const url = buildOpeniImageUrl(file, bucket);
  if (!url) return null;
  if (!(await headImageUrl(url))) return null;
  foundRef.url = url;
  foundRef.bucket = String(bucket);
  return url;
}

/**
 * Find Open-i CDN bucket for a PMC article + figure file.
 */
export async function probeOpeniBucket(pmc, file) {
  const pmcId = String(pmc || '').trim();
  const fileKey = String(file || '').trim();
  if (!pmcId || !fileKey.startsWith('openi__')) return { bucket: '', url: '' };

  const cachedBucket = getCachedPmcBucket(pmcId);
  if (cachedBucket) {
    const url = buildOpeniImageUrl(fileKey, cachedBucket);
    if (url && (await headImageUrl(url))) return { bucket: cachedBucket, url };
  }

  const foundRef = { url: '', bucket: '' };
  const buckets = getKnownBuckets();
  const cachedIdx = cachedBucket ? buckets.indexOf(Number(cachedBucket)) : -1;
  const ordered = cachedIdx >= 0
    ? [Number(cachedBucket), ...buckets.filter(b => b !== Number(cachedBucket))]
    : buckets;

  const BATCH = 96;
  for (let i = 0; i < ordered.length && !foundRef.url; i += BATCH) {
    const slice = ordered.slice(i, i + BATCH);
    await Promise.all(slice.map(b => runInPool(() => tryBucketForFile(pmcId, fileKey, b, foundRef))));
  }

  if (foundRef.url && foundRef.bucket) {
    rememberPmcBucket(pmcId, foundRef.bucket);
    return { bucket: foundRef.bucket, url: foundRef.url };
  }

  return { bucket: '', url: '' };
}

export async function probeOpeniBucketForPmc(pmc, sampleFile) {
  const file = sampleFile || `openi__${pmc}_probe.png`;
  return probeOpeniBucket(pmc, file);
}

export function openiBasenameVariants(file) {
  const base = openiBasename(file);
  const variants = new Set([base]);
  if (/\.png$/i.test(base)) variants.add(base.replace(/\.png$/i, '.jpg'));
  if (/\.jpe?g$/i.test(base)) variants.add(base.replace(/\.jpe?g$/i, '.png'));
  return [...variants];
}

export async function resolveOpeniFileUrl(file, bucket) {
  const pmc = pmcFromOpeniFile(file);
  if (!pmc || !bucket) return '';
  for (const base of openiBasenameVariants(file)) {
    const candidate = buildOpeniImageUrl(`openi__${base}`, bucket);
    if (candidate && (await headImageUrl(candidate))) return candidate;
  }
  return buildOpeniImageUrl(file, bucket);
}
