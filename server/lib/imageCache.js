import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_ROOT = process.env.SHARK_IMAGE_CACHE_DIR
  || (process.env.VERCEL
    ? path.join(os.tmpdir(), 'shark-medical-image-cache')
    : path.join(os.homedir(), '.shark-medical', 'image-cache'));
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

function hashKey(namespace, id) {
  return crypto.createHash('sha256').update(`${namespace}|${id}`).digest('hex');
}

function pathsFor(key) {
  const dir = path.join(CACHE_ROOT, key.slice(0, 2));
  return {
    dir,
    meta: path.join(dir, `${key}.json`),
    bin: path.join(dir, `${key}.bin`)
  };
}

export function readImageCache(namespace, id) {
  const key = hashKey(namespace, id);
  const { meta, bin } = pathsFor(key);
  if (!fs.existsSync(meta) || !fs.existsSync(bin)) return null;
  try {
    const info = JSON.parse(fs.readFileSync(meta, 'utf8'));
    if (Date.now() - info.savedAt > MAX_AGE_MS) return null;
    return {
      key,
      contentType: info.contentType || 'application/octet-stream',
      buffer: fs.readFileSync(bin)
    };
  } catch {
    return null;
  }
}

export function writeImageCache(namespace, id, buffer, contentType) {
  const key = hashKey(namespace, id);
  const { dir, meta, bin } = pathsFor(key);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${bin}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, buffer);
  fs.renameSync(tmp, bin);
  fs.writeFileSync(meta, JSON.stringify({
    savedAt: Date.now(),
    contentType: contentType || 'application/octet-stream',
    size: buffer.length
  }));
  return key;
}

export function createImageReadStream(namespace, id) {
  const key = hashKey(namespace, id);
  const { meta, bin } = pathsFor(key);
  if (!fs.existsSync(meta) || !fs.existsSync(bin)) return null;
  try {
    const info = JSON.parse(fs.readFileSync(meta, 'utf8'));
    if (Date.now() - info.savedAt > MAX_AGE_MS) return null;
    return {
      contentType: info.contentType || 'application/octet-stream',
      size: info.size,
      stream: fs.createReadStream(bin)
    };
  } catch {
    return null;
  }
}

const inflight = new Map();

export async function dedupeFetch(key, fetchFn) {
  if (inflight.has(key)) return inflight.get(key);
  const promise = fetchFn().finally(() => inflight.delete(key));
  inflight.set(key, promise);
  return promise;
}
