/**
 * 影像来源插件基类工具
 */
export function buildSearchUrl(template, query, disease = {}) {
  const q = query || disease.en || disease.title || '';
  if (typeof template === 'function') return template(q, disease);
  if (!template) return '';
  return template.replace(/\{q\}/g, encodeURIComponent(q));
}

export function normalizeHit(sourceId, hit) {
  return {
    sourceId,
    file: hit.file || hit.fileId || '',
    url: hit.url || hit.imageUrl || '',
    title: hit.title || hit.caption || '',
    caption: hit.caption || hit.title || '',
    author: hit.author || '',
    license: hit.license || '',
    licenseUrl: hit.licenseUrl || '',
    pageUrl: hit.pageUrl || '',
    modality: hit.modality || '',
    score: hit.score ?? null,
    meta: hit.meta || {}
  };
}

export function formatCitation(hit, source) {
  const author = hit.author || '见原文';
  const title = hit.title || hit.caption || hit.file || '医学影像';
  const src = source?.name || hit.sourceId || '来源';
  const page = hit.pageUrl || source?.homepage || '';
  const lic = hit.license || source?.license?.summary || '';
  let cite = `${author}. ${title}. ${src}.`;
  if (page) cite += ` ${page}`;
  if (lic) cite += ` [${lic}]`;
  return cite.trim();
}

export async function withTimeout(promise, ms = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await promise;
  } finally {
    clearTimeout(timer);
  }
}
