import { searchPmcFigures } from '../../pmc-figures-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'europmc-figures';

export async function search(query, opts = {}) {
  const limit = opts.limit ?? 10;
  const figs = await searchPmcFigures(query, { limit, maxArticles: 4 });
  return figs.map(f =>
    normalizeHit('biomed-central', {
      file: f.file,
      url: f.url,
      title: f.caption || f.articleTitle,
      caption: f.caption || f.articleTitle,
      author: f.author,
      license: 'PMC Open Access（见原文）',
      licenseUrl: 'https://www.ncbi.nlm.nih.gov/pmc/about/openft/',
      pageUrl: f.pageUrl,
      meta: { pmcid: f.pmcid, journal: f.journal, source: 'Europe PMC Figures' }
    })
  );
}

export async function health() {
  const { healthPmcFigures } = await import('../../pmc-figures-api.mjs');
  return healthPmcFigures();
}
