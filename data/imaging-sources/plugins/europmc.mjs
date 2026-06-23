/**
 * Europe PMC — BioMed Central / OA 文献检索（图像需跳转原文）
 * https://www.ebi.ac.uk/europepmc/webservices/rest/
 */
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from '../../wikimedia-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'europmc';
const BASE = 'https://www.ebi.ac.uk/europepmc/webservices/rest';

export async function search(query, opts = {}) {
  const limit = Math.min(opts.limit ?? 8, 25);
  const url = new URL(`${BASE}/search`);
  url.searchParams.set('query', `${query} AND OPEN_ACCESS:Y`);
  url.searchParams.set('format', 'json');
  url.searchParams.set('pageSize', String(limit));
  url.searchParams.set('resultType', 'core');

  const dispatcher = await getDispatcher();
  const res = await undiciFetch(url.toString(), {
    headers: { Accept: 'application/json', 'User-Agent': 'SharkMedical/1.0 imaging-sources' },
    dispatcher
  });
  if (!res.ok) throw new Error(`Europe PMC HTTP ${res.status}`);
  const data = await res.json();
  const results = data.resultList?.result || [];

  return results.map(r => {
    const pmcid = r.pmcid || '';
    const pmid = r.pmid || '';
    const pageUrl = pmcid
      ? `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}/`
      : pmid
        ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
        : r.fullTextUrl || '';
    const file = pmcid ? `europmc__${pmcid.replace(/^PMC/i, 'PMC')}` : `europmc__PMID${pmid}`;
    return normalizeHit('biomed-central', {
      file,
      title: r.title || query,
      caption: `${r.journalTitle || 'Europe PMC'} · ${(r.title || '').slice(0, 80)}`,
      author: (r.authorString || '见原文').split(',')[0]?.trim(),
      license: 'Open Access（见原文）',
      licenseUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/',
      pageUrl,
      meta: { pmcid, pmid, journal: r.journalTitle, year: r.pubYear }
    });
  });
}

export async function health() {
  const hits = await search('osteoblastoma', { limit: 1 });
  return { ok: hits.length > 0 };
}
