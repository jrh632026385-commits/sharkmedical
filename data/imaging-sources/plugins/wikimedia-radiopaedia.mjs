import { searchCommonsFiles } from '../../wikimedia-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'wikimedia-radiopaedia';

export async function search(query, opts = {}) {
  const limit = opts.limit ?? 8;
  const hits = await searchCommonsFiles(`radiopaedia ${query} radiograph`, limit);
  return hits
    .filter(h => /radiopaedia|radsource/i.test(h.file))
    .map(h =>
      normalizeHit('radiopaedia-commons', {
        file: h.file,
        title: h.file,
        caption: h.file,
        author: h.author,
        license: h.license,
        licenseUrl: h.licenseUrl,
        pageUrl: h.pageUrl,
        meta: { mirror: 'wikimedia' }
      })
    );
}

export async function health() {
  const hits = await search('fracture', { limit: 1 });
  return { ok: hits.length > 0 };
}
