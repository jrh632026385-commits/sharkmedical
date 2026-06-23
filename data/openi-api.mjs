/**
 * Open-i (NLM) 检索 API 客户端
 * https://openi.nlm.nih.gov/api/search
 */
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from './wikimedia-api.mjs';

export const OPENI_BASE = 'https://openi.nlm.nih.gov';
export const OPENI_USER_AGENT = 'SharkMedical/1.0 (orthopedic imaging atlas; educational) NodeJS';

const DEFAULT_TIMEOUT_MS = 45000;
const MAX_RETRIES = 3;
let _lastRequestAt = 0;
const MIN_REQUEST_GAP_MS = 600;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function throttle() {
  const wait = MIN_REQUEST_GAP_MS - (Date.now() - _lastRequestAt);
  if (wait > 0) await sleep(wait);
  _lastRequestAt = Date.now();
}

export function stripHtml(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function openiImageUrl(imgPath) {
  if (!imgPath) return '';
  if (/^https?:\/\//i.test(imgPath)) return imgPath;
  return `${OPENI_BASE}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

export function openiFileId(hit) {
  const path = hit?.imgLarge || hit?.imgThumb || '';
  const base = path.split('/').pop() || hit?.uid || 'unknown';
  return `openi__${base}`;
}

export function openiAttribFromHit(hit) {
  const caption = stripHtml(hit?.image?.caption || hit?.title || 'Medical image');
  const authors = stripHtml(hit?.authors || '见原文页面');
  const pageUrl = hit?.pmc_url || hit?.fulltext_html_url || openiImageUrl(hit?.imgLarge);
  return {
    source: 'Open-i / PubMed Central',
    author: authors.split(',')[0]?.trim() || authors || '见原文页面',
    license: 'PMC Open Access（见原文）',
    licenseUrl: 'https://www.ncbi.nlm.nih.gov/pmc/about/openft/',
    pageUrl,
    title: caption.slice(0, 120) || stripHtml(hit?.title || '').slice(0, 120)
  };
}

/**
 * @param {string} query
 * @param {{ limit?: number, imageType?: string, start?: number, timeoutMs?: number }} [opts]
 */
export async function searchOpenI(query, opts = {}) {
  const limit = Math.min(Math.max(opts.limit ?? 8, 1), 50);
  const start = opts.start ?? 1;
  const imageType = opts.imageType ?? 'xg';
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retries = opts.retries ?? MAX_RETRIES;

  const url = new URL(`${OPENI_BASE}/api/search`);
  url.searchParams.set('query', query);
  url.searchParams.set('m', String(start));
  url.searchParams.set('n', String(limit));
  if (imageType) url.searchParams.set('it', imageType);

  let lastErr;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const dispatcher = await getDispatcher();
      await throttle();
      const res = await undiciFetch(url.toString(), {
        method: 'GET',
        headers: {
          'User-Agent': OPENI_USER_AGENT,
          Accept: 'application/json'
        },
        signal: controller.signal,
        dispatcher
      });
      clearTimeout(timer);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const text = await res.text();
      if (text.startsWith('<!') || text.startsWith('<html')) {
        throw new Error('Open-i 返回 HTML（站点维护或需代理）');
      }
      const data = JSON.parse(text);
      const list = Array.isArray(data?.list) ? data.list : [];
      return {
        total: Number(data?.total) || list.length,
        count: Number(data?.count) || list.length,
        list: list.map(hit => ({
          ...hit,
          imageCaption: stripHtml(hit?.image?.caption || ''),
          articleTitle: stripHtml(hit?.title || ''),
          imageUrl: openiImageUrl(hit?.imgLarge || hit?.imgThumbLarge || hit?.imgThumb),
          fileId: openiFileId(hit)
        }))
      };
    } catch (err) {
      lastErr = err;
      if (attempt < retries - 1) await sleep(500 * (attempt + 1));
    }
  }

  throw new Error(lastErr?.message || 'Open-i search failed');
}
