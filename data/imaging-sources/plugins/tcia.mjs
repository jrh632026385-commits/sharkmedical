/**
 * TCIA NBIA REST API — 集合/患者元数据（DICOM 下载需 NBIA 客户端）
 * https://wiki.cancerimagingarchive.net/display/NBIA/NBIA+REST+Web+Services
 */
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from '../../wikimedia-api.mjs';
import { normalizeHit } from '../plugin-base.mjs';

export const id = 'tcia';
const BASE = 'https://services.cancerimagingarchive.net/nbia-api/services';

async function tciaGet(path, params = {}, timeoutMs = 15000) {
  const url = new URL(`${BASE}/${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v));
  }
  const dispatcher = await getDispatcher();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await undiciFetch(url.toString(), {
      headers: { Accept: 'application/json', 'User-Agent': 'SharkMedical/1.0 imaging-sources' },
      dispatcher,
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`TCIA HTTP ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function search(query, opts = {}) {
  const limit = opts.limit ?? 8;
  const collections = await tciaGet('getCollectionNames');
  const names = (Array.isArray(collections) ? collections : [])
    .map(c => (typeof c === 'string' ? c : c.Collection || c.collection || ''))
    .filter(Boolean);

  const q = query.toLowerCase();
  const matched = names.filter(n => n.toLowerCase().includes(q) || q.split(/\s+/).some(w => w.length >= 4 && n.toLowerCase().includes(w)));
  const picked = (matched.length ? matched : names).slice(0, limit);

  const out = [];
  for (const collection of picked) {
    try {
      const patients = await tciaGet('getPatient', { Collection: collection });
      const count = Array.isArray(patients) ? patients.length : 0;
      out.push(
        normalizeHit('tcia', {
          file: `tcia__${collection.replace(/\W+/g, '_')}`,
          title: collection,
          caption: `TCIA 集合 · ${collection}（${count} 患者）`,
          author: 'TCIA / NBIA',
          license: 'TCIA Data Usage Policy',
          licenseUrl: 'https://www.cancerimagingarchive.net/',
          pageUrl: `https://www.cancerimagingarchive.net/collection/${encodeURIComponent(collection.toLowerCase().replace(/\s+/g, '-'))}/`,
          meta: { collection, patientCount: count, type: 'collection' }
        })
      );
    } catch {
      out.push(
        normalizeHit('tcia', {
          file: `tcia__${collection.replace(/\W+/g, '_')}`,
          title: collection,
          caption: `TCIA 集合 · ${collection}`,
          pageUrl: `https://www.cancerimagingarchive.net/collections/`,
          meta: { collection, type: 'collection' }
        })
      );
    }
  }
  return out.slice(0, limit);
}

export async function health() {
  const cols = await tciaGet('getCollectionNames');
  return { ok: Array.isArray(cols) && cols.length > 0, collections: Array.isArray(cols) ? cols.length : 0 };
}
