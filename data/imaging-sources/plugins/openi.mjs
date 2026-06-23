import { searchOpenI, openiAttribFromHit, openiImageUrl, openiFileId } from '../../openi-api.mjs';
import { OPENI_BLOCK } from '../../gallery-match-utils.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'openi';

export async function search(query, opts = {}) {
  const limit = opts.limit ?? 8;
  const { list } = await searchOpenI(query, { limit, imageType: opts.imageType || 'xg' });
  return list
    .filter(hit => hit.imageUrl && !OPENI_BLOCK.test(openiFileId(hit)))
    .map(hit => {
      const attrib = openiAttribFromHit(hit);
      return normalizeHit(opts.sourceId || 'openi', {
        file: openiFileId(hit),
        url: hit.imageUrl,
        title: attrib.title,
        caption: attrib.title,
        author: attrib.author,
        license: attrib.license,
        licenseUrl: attrib.licenseUrl,
        pageUrl: attrib.pageUrl,
        meta: { uid: hit.uid, journal: hit.journal_title }
      });
    });
}

export async function health() {
  const hits = await search('fracture radiograph', { limit: 1 });
  return { ok: hits.length > 0 };
}

export { openiImageUrl, openiFileId, openiAttribFromHit };
