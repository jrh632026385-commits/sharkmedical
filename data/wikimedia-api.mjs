/**
 * Wikimedia Commons API 统一客户端（Node / 服务端 / 脚本共用）
 * 合规 User-Agent、超时、重试、代理、元数据解析
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetch as undiciFetch, ProxyAgent, EnvHttpProxyAgent } from 'undici';
import net from 'net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, 'local.env') });

export const WIKIMEDIA_API_BASE = 'https://commons.wikimedia.org/w/api.php';
export const WIKIMEDIA_USER_AGENT =
  'SharkMedical/1.0 (orthopedic imaging atlas; educational) NodeJS';

const DEFAULT_TIMEOUT_MS = 25000;
const MAX_RETRIES = 3;
const LOCAL_PROXY_CANDIDATES = ['http://127.0.0.1:7890', 'http://127.0.0.1:7891', 'http://127.0.0.1:1080'];

let _dispatcher;
let _dispatcherReady;
let _lastRequestAt = 0;
const MIN_REQUEST_GAP_MS = 500;

async function throttle() {
  const wait = MIN_REQUEST_GAP_MS - (Date.now() - _lastRequestAt);
  if (wait > 0) await sleep(wait);
  _lastRequestAt = Date.now();
}

function hasExplicitProxy() {
  return !!(
    process.env.WIKIMEDIA_HTTP_PROXY ||
    process.env.WIKIMEDIA_HTTPS_PROXY ||
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY
  );
}

function makeDispatcher(proxyUrl) {
  return proxyUrl ? new ProxyAgent(proxyUrl) : new EnvHttpProxyAgent();
}

function probeLocalProxy(proxyUrl, ms = 400) {
  return new Promise(resolve => {
    let host = '127.0.0.1';
    let port = 7890;
    try {
      const u = new URL(proxyUrl);
      host = u.hostname || host;
      port = Number(u.port) || (u.protocol === 'https:' ? 443 : 80);
    } catch {
      return resolve(false);
    }
    const sock = net.connect({ host, port });
    const done = ok => {
      sock.destroy();
      resolve(ok);
    };
    sock.setTimeout(ms);
    sock.once('connect', () => done(true));
    sock.once('timeout', () => done(false));
    sock.once('error', () => done(false));
  });
}

async function resolveDispatcher() {
  if (_dispatcherReady) return _dispatcherReady;
  _dispatcherReady = (async () => {
    const explicit =
      process.env.WIKIMEDIA_HTTP_PROXY ||
      process.env.WIKIMEDIA_HTTPS_PROXY ||
      process.env.HTTPS_PROXY ||
      process.env.HTTP_PROXY;
    if (explicit) {
      _dispatcher = makeDispatcher(explicit);
      return _dispatcher;
    }
    for (const url of LOCAL_PROXY_CANDIDATES) {
      if (await probeLocalProxy(url)) {
        _dispatcher = makeDispatcher(url);
        return _dispatcher;
      }
    }
    _dispatcher = makeDispatcher(null);
    return _dispatcher;
  })();
  return _dispatcherReady;
}

export async function getDispatcher() {
  await resolveDispatcher();
  return _dispatcher;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export function wikiFilePageUrl(filename) {
  const title = `File:${String(filename).replace(/ /g, '_')}`;
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`;
}

export function stripHtmlMeta(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function licenseFromMeta(meta = {}) {
  const license = stripHtmlMeta(meta.LicenseShortName?.value || meta.UsageTerms?.value || '');
  const licenseUrl = stripHtmlMeta(meta.LicenseUrl?.value || '');
  const author = stripHtmlMeta(
    meta.Artist?.value || meta.Credit?.value || meta.Attribution?.value || 'Unknown'
  );
  return { license, licenseUrl, author };
}

export function attribFromExtMetadata(filename, meta = {}) {
  const lic = licenseFromMeta(meta);
  return {
    source: 'Wikimedia Commons',
    author: lic.author || '见原文页面',
    license: lic.license || '见原文页面',
    licenseUrl: lic.licenseUrl || '',
    pageUrl: wikiFilePageUrl(filename),
    title: stripHtmlMeta(meta.ObjectName?.value || filename)
  };
}

function formatFetchError(err) {
  const code = err?.cause?.code || err?.code || '';
  if (err?.name === 'AbortError' || /aborted/i.test(err?.message || '')) {
    return 'Wikimedia API 请求超时';
  }
  if (code === 'UND_ERR_CONNECT_TIMEOUT' || /timeout/i.test(err?.message || '')) {
    return (
      '无法连接 Wikimedia（连接超时）。若在国内网络，请设置 HTTP_PROXY / HTTPS_PROXY 或 WIKIMEDIA_HTTP_PROXY 后重试'
    );
  }
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
    return '无法解析 Wikimedia 域名（DNS 失败）';
  }
  if (code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || code === 'CERT_') {
    return `TLS 证书错误: ${code}`;
  }
  return err?.message || 'fetch failed';
}

/**
 * @param {Record<string, string>} params - action=query 等参数（勿含 format/origin）
 * @param {{ baseUrl?: string, timeoutMs?: number, retries?: number, proxyBase?: string }} [opts]
 */
export async function wikimediaQuery(params, opts = {}) {
  const retries = opts.retries ?? MAX_RETRIES;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const directBase = opts.baseUrl || WIKIMEDIA_API_BASE;
  const proxyBase = opts.proxyBase || process.env.WIKIMEDIA_PROXY_BASE || '';

  const bases = proxyBase ? [proxyBase, directBase] : [directBase];
  let lastErr;

  for (const base of bases) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const url = new URL(base);
        url.searchParams.set('format', 'json');
        url.searchParams.set('origin', '*');
        for (const [k, v] of Object.entries(params)) {
          if (v != null && v !== '') url.searchParams.set(k, String(v));
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        const dispatcher = await getDispatcher();
        await throttle();
        const res = await undiciFetch(url.toString(), {
          method: 'GET',
          headers: {
            'User-Agent': WIKIMEDIA_USER_AGENT,
            Accept: 'application/json'
          },
          signal: controller.signal,
          dispatcher
        });
        clearTimeout(timer);

        if (!res.ok) {
          if (res.status === 429 && attempt < retries - 1) {
            const retryAfter = Number(res.headers.get('retry-after')) || 5 + attempt * 3;
            await sleep(retryAfter * 1000);
            continue;
          }
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (data?.error) {
          throw new Error(data.error.info || data.error.code || 'Wikimedia API error');
        }
        return data;
      } catch (err) {
        lastErr = err;
        const isLast = attempt === retries - 1;
        if (!isLast) await sleep(400 * (attempt + 1));
      }
    }
  }

  throw new Error(formatFetchError(lastErr));
}

export async function searchCommonsFiles(query, limit = 8, opts = {}) {
  const data = await wikimediaQuery(
    {
      action: 'query',
      generator: 'search',
      gsrsearch: `filetype:bitmap ${query}`,
      gsrnamespace: '6',
      gsrlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|mime|size',
      iiurlwidth: '400'
    },
    opts
  );

  const pages = data.query?.pages || {};
  return Object.values(pages).map(p => {
    const ii = p.imageinfo?.[0] || {};
    const meta = ii.extmetadata || {};
    const lic = licenseFromMeta(meta);
    const file = p.title.replace(/^File:/, '');
    return {
      file,
      mime: ii.mime,
      width: ii.width,
      height: ii.height,
      pageUrl: wikiFilePageUrl(file),
      ...lic
    };
  });
}

export async function fetchFileMetadata(filename, opts = {}) {
  const title = `File:${String(filename).replace(/ /g, '_')}`;
  const data = await wikimediaQuery(
    {
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'extmetadata',
      titles: title
    },
    opts
  );
  const pages = data.query?.pages || {};
  const page = pages[Object.keys(pages)[0]];
  if (!page || page.missing || !page.imageinfo?.[0]) {
    throw new Error(`missing file: ${filename}`);
  }
  return attribFromExtMetadata(filename, page.imageinfo[0].extmetadata || {});
}
