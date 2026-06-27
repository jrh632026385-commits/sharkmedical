import { searchEducationWebImages } from '../../education-web-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'education-web';

export async function search(query, opts = {}) {
  const disease = opts.disease || { title: query, en: query };
  const limit = opts.limit ?? 16;
  const per = Math.max(2, Math.ceil(limit / 8));
  const hits = await searchEducationWebImages(disease, {
    limitPerSource: per,
    sourceIds: opts.sourceIds,
    timeoutMs: opts.timeoutMs ?? 10000
  });
  return hits.slice(0, limit).map(h =>
    normalizeHit(opts.sourceId || h.sourceId || 'education-web', {
      file: h.file,
      url: h.url,
      title: h.caption,
      caption: h.caption,
      author: h.author,
      license: h.license,
      licenseUrl: h.licenseUrl,
      pageUrl: h.pageUrl,
      meta: { source: h.source, sourceId: h.sourceId }
    })
  );
}

export async function health() {
  const { healthEducationWeb } = await import('../../education-web-api.mjs');
  return healthEducationWeb();
}

