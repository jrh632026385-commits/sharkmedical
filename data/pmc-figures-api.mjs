/**
 * Europe PMC / PMC 开放获取文章 · 从 fullTextXML 提取 figure 影像 URL
 */
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from './wikimedia-api.mjs';

const REST = 'https://www.ebi.ac.uk/europepmc/webservices/rest';
const UA = 'SharkMedical/1.0 (educational imaging atlas) NodeJS';

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function figureUrl(pmcid, href) {
  const file = String(href || '').replace(/^.*\//, '');
  if (!file || /^https?:\/\//i.test(href)) return href;
  const id = pmcid.replace(/^PMC/i, 'PMC');
  return `https://europepmc.org/articles/${id}/bin/${file}`;
}

function parseFiguresFromXml(xml, pmcid) {
  const out = [];
  const blocks = [...String(xml).matchAll(/<fig[^>]*>([\s\S]*?)<\/fig>/gi)];
  for (const [, body] of blocks) {
    const caption = stripTags(body.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i)?.[1] || '');
    const href = body.match(/xlink:href="([^"]+)"/i)?.[1] || '';
    if (!href || !/\.(jpe?g|png|gif|tiff?)$/i.test(href)) continue;
    if (/logo|icon|button|license|creativecommons/i.test(href)) continue;
    const url = figureUrl(pmcid, href);
    const file = `europmcfig__${pmcid}_${href.replace(/^.*\//, '').replace(/\W+/g, '_')}`.slice(0, 120);
    out.push({ file, url, caption, pmcid, href });
  }
  return out;
}

async function epmcGet(path, params = {}, timeoutMs = 20000) {
  const url = new URL(`${REST}/${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v));
  }
  const dispatcher = await getDispatcher();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await undiciFetch(url.toString(), {
      headers: { Accept: 'application/json', 'User-Agent': UA },
      dispatcher,
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`Europe PMC HTTP ${res.status}`);
    return res.json();
  } catch {
    return { resultList: { result: [] } };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFullTextXml(pmcid, timeoutMs = 25000) {
  const dispatcher = await getDispatcher();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await undiciFetch(`${REST}/${pmcid}/fullTextXML`, {
      headers: { Accept: 'application/xml', 'User-Agent': UA },
      dispatcher,
      signal: controller.signal
    });
    if (!res.ok) return '';
    return res.text();
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {string} query Lucene query
 * @param {{ limit?: number, maxArticles?: number, lang?: string }} opts
 */
export async function searchPmcFigures(query, opts = {}) {
  const limit = opts.limit ?? 12;
  const maxArticles = opts.maxArticles ?? 3;
  const lang = opts.lang || '';
  const q = lang ? `${query} AND OPEN_ACCESS:Y AND LANG:${lang}` : `${query} AND OPEN_ACCESS:Y`;

  const data = await epmcGet('search', {
    query: q,
    format: 'json',
    pageSize: String(maxArticles),
    resultType: 'core'
  });
  const articles = data.resultList?.result || [];
  const hits = [];

  for (const art of articles) {
    const pmcid = art.pmcid;
    if (!pmcid) continue;
    const xml = await fetchFullTextXml(pmcid);
    if (!xml || xml.length < 200) continue;
    const figs = parseFiguresFromXml(xml, pmcid);
    const pageUrl = `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}/`;
    for (const fig of figs) {
      hits.push({
        ...fig,
        articleTitle: art.title || '',
        journal: art.journalTitle || '',
        pageUrl,
        author: (art.authorString || '见原文').split(',')[0]?.trim()
      });
      if (hits.length >= limit) return hits;
    }
  }
  return hits;
}

export async function healthPmcFigures() {
  const hits = await searchPmcFigures('fracture radiograph', { limit: 1, maxArticles: 2 });
  return { ok: hits.length > 0, sample: hits[0]?.file || null };
}
