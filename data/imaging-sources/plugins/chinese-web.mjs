import { searchChineseWebImages } from '../../chinese-web-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'chinese-web';

export async function search(query, opts = {}) {
  const disease = opts.disease || { title: query, en: query };
  const limit = opts.limit ?? 12;
  const hits = await searchChineseWebImages(disease, { limitPerSource: Math.ceil(limit / 4) });
  return hits.slice(0, limit).map(h =>
    normalizeHit(opts.sourceId || 'chinese-web', {
      file: h.file,
      url: h.url,
      title: h.caption,
      caption: h.caption,
      author: h.author,
      license: h.license,
      licenseUrl: h.licenseUrl,
      pageUrl: h.pageUrl,
      meta: { source: h.source }
    })
  );
}

export async function health() {
  const { healthChineseWeb } = await import('../../chinese-web-api.mjs');
  return healthChineseWeb();
}
