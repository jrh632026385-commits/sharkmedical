import { searchCommonsFiles, fetchFileMetadata } from '../../wikimedia-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'wikimedia';

export async function search(query, opts = {}) {
  const limit = opts.limit ?? 8;
  const hits = await searchCommonsFiles(`${query} medical radiograph`, limit);
  return hits.map(h =>
    normalizeHit('wikimedia-commons', {
      file: h.file,
      title: h.file,
      caption: h.file,
      author: h.author,
      license: h.license,
      licenseUrl: h.licenseUrl,
      pageUrl: h.pageUrl,
      meta: { mime: h.mime, width: h.width, height: h.height }
    })
  );
}

export async function metadata(file) {
  const attrib = await fetchFileMetadata(file);
  return normalizeHit('wikimedia-commons', {
    file,
    ...attrib,
    title: attrib.title || file
  });
}

export async function health() {
  const hits = await searchCommonsFiles('fracture', 1);
  return { ok: true, sample: hits.length };
}
