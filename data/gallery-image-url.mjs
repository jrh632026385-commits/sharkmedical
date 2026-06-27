/**
 * 图库条目 → 可加载的图片 URL（供前端与回填脚本共用）
 */
export const NON_WIKI_FILE =
  /^(openi__|baiduimg__|europmcfig__|cnkiepmc__|uscase__|baike__|dxy__|cmacsr__|eduweb__)/i;

export function isOpeniUrl(u) {
  return /^https?:\/\/openi\.nlm\.nih\.gov\//i.test(String(u || ''));
}

export function openiBasename(file) {
  return String(file || '').replace(/^openi__/, '');
}

export function pmcFromOpeniFile(file) {
  const m = String(file || '').match(/^openi__(PMC\d+)_/);
  return m ? m[1] : '';
}

export function buildOpeniImageUrl(file, bucket) {
  const base = openiBasename(file);
  const m = base.match(/^PMC(\d+)_(.+)$/);
  if (!m || !bucket) return '';
  return `https://openi.nlm.nih.gov/imgs/512/${bucket}/${m[1]}/${base}`;
}

export function buildBucketMapFromGalleries(galleries) {
  const map = new Map();
  for (const gallery of Object.values(galleries || {})) {
    if (!Array.isArray(gallery)) continue;
    for (const item of gallery) {
      const file = String(item?.file || '');
      const url = String(item?.url || '');
      if (!file.startsWith('openi__') || !url) continue;
      const um = url.match(/\/imgs\/512\/(\d+)\/(\d+)\//);
      const pm = pmcFromOpeniFile(file);
      if (um && pm) map.set(pm, um[1]);
    }
  }
  return map;
}

export function registryImageUrl(filename, registry) {
  const hit = registry?.[filename];
  if (!hit) return '';
  if (hit.imageUrl) return hit.imageUrl;
  if (hit.pageUrl && isOpeniUrl(hit.pageUrl) && /\/imgs\//.test(hit.pageUrl)) return hit.pageUrl;
  return '';
}

export function wikiFileFromPageUrl(url) {
  const m = String(url || '').match(/commons\.wikimedia\.org\/wiki\/File:([^?#]+)/i);
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
}

export function needsExternalImageProxy(url) {
  try {
    const h = new URL(url).hostname;
    if (/^(localhost|127\.)/.test(h)) return false;
    if (/commons\.wikimedia\.org/i.test(h)) return false;
    if (/openi\.nlm\.nih\.gov/i.test(h)) return false;
    return true;
  } catch {
    return false;
  }
}
