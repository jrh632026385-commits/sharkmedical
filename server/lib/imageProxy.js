import { fetch as undiciFetch } from 'undici';
import { getDispatcher, WIKIMEDIA_USER_AGENT, wikimediaQuery } from '../../data/wikimedia-api.mjs';
import {
  dedupeFetch,
  readImageCache,
  writeImageCache
} from './imageCache.js';
import { runInPool } from './downloadPool.js';

const USER_AGENT = WIKIMEDIA_USER_AGENT;
const MAX_WIKIMEDIA_RETRIES = 4;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isImageContentType(contentType) {
  return !!contentType && !/text\/html/i.test(contentType);
}

export function sendCachedImage(res, cached) {
  res.setHeader('Content-Type', cached.contentType);
  res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  res.setHeader('Content-Length', cached.buffer.length);
  res.setHeader('X-Shark-Image-Cache', 'HIT');
  res.send(cached.buffer);
}

async function downloadImageUrl(targetUrl, headers = {}, userAgent = USER_AGENT) {
  const dispatcher = await getDispatcher();
  let lastErr;

  for (let attempt = 0; attempt < MAX_WIKIMEDIA_RETRIES; attempt++) {
    const upstream = await undiciFetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        Accept: 'image/*,*/*;q=0.8',
        ...headers
      },
      redirect: 'follow',
      dispatcher
    });

    if (upstream.status === 429) {
      await sleep(800 * (attempt + 1));
      continue;
    }

    if (!upstream.ok) {
      const err = new Error(`upstream HTTP ${upstream.status}`);
      err.status = upstream.status;
      lastErr = err;
      if (upstream.status >= 500 && attempt < MAX_WIKIMEDIA_RETRIES - 1) {
        await sleep(500 * (attempt + 1));
        continue;
      }
      throw err;
    }

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    if (!isImageContentType(contentType)) {
      const err = new Error('upstream returned non-image content');
      err.status = upstream.status === 404 ? 404 : 502;
      throw err;
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    return { contentType, buffer };
  }

  throw lastErr || new Error('upstream rate limited');
}

export async function proxyImageBytes(res, {
  namespace,
  cacheId,
  targetUrl,
  headers = {},
  userAgent = USER_AGENT
}) {
  const cached = readImageCache(namespace, cacheId);
  if (cached) {
    sendCachedImage(res, cached);
    return;
  }

  const body = await dedupeFetch(`${namespace}|${cacheId}`, async () => {
    const hit = readImageCache(namespace, cacheId);
    if (hit) return hit;

    const downloaded = await downloadImageUrl(targetUrl, headers, userAgent);
    writeImageCache(namespace, cacheId, downloaded.buffer, downloaded.contentType);
    return downloaded;
  });

  res.setHeader('Content-Type', body.contentType);
  res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  res.setHeader('Content-Length', body.buffer.length);
  res.setHeader('X-Shark-Image-Cache', 'MISS');
  res.send(body.buffer);
}

export function wikimediaThumbUrl(file, width) {
  const f = String(file || '').trim().replace(/ /g, '_');
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=${width}`;
}

export function clampImageWidth(width, fallback = 800) {
  const n = Number(width);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(2400, Math.max(120, Math.round(n)));
}

async function wikimediaApiImageUrl(file, width) {
  const title = `File:${String(file || '').trim().replace(/ /g, '_')}`;
  const data = await wikimediaQuery({
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|mime|thumburl',
    iiurlwidth: String(width)
  });
  const pages = data?.query?.pages;
  if (!pages) return '';
  const page = pages[Object.keys(pages)[0]];
  if (!page || page.missing) return '';
  const info = page.imageinfo?.[0];
  return info?.thumburl || info?.url || '';
}

export async function fetchWikimediaImage(file, width) {
  const cacheId = `${file}|w${width}`;
  const cached = readImageCache('wikimedia', cacheId);
  if (cached) return cached;

  return dedupeFetch(`wikimedia|${cacheId}`, async () => {
    const hit = readImageCache('wikimedia', cacheId);
    if (hit) return hit;

    const urls = [];
    try {
      const apiUrl = await runInPool(() => wikimediaApiImageUrl(file, width));
      if (apiUrl) urls.push(apiUrl);
    } catch {
      /* API fallback optional */
    }
    const thumbUrl = wikimediaThumbUrl(file, width);
    if (!urls.includes(thumbUrl)) urls.push(thumbUrl);

    let lastErr;
    for (const url of urls) {
      try {
        const downloaded = await runInPool(() => downloadImageUrl(url));
        writeImageCache('wikimedia', cacheId, downloaded.buffer, downloaded.contentType);
        return downloaded;
      } catch (err) {
        lastErr = err;
      }
    }

    const err = lastErr || new Error('wikimedia fetch failed');
    err.status = err.status || 502;
    throw err;
  });
}

export async function sendWikimediaImage(res, file, width) {
  const cached = readImageCache('wikimedia', `${file}|w${width}`);
  if (cached) {
    sendCachedImage(res, cached);
    return;
  }

  const body = await fetchWikimediaImage(file, width);
  res.setHeader('Content-Type', body.contentType);
  res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  res.setHeader('Content-Length', body.buffer.length);
  res.setHeader('X-Shark-Image-Cache', cached ? 'HIT' : 'MISS');
  res.send(body.buffer);
}
