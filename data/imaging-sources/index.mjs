/**
 * 影像来源插件调度器
 */
import { SOURCE_BY_ID, listSources } from './registry.mjs';
import { buildSearchUrl, formatCitation } from './plugin-base.mjs';
import * as wikimedia from './plugins/wikimedia.mjs';
import * as wikimediaRadiopaedia from './plugins/wikimedia-radiopaedia.mjs';
import * as openi from './plugins/openi.mjs';
import * as europmc from './plugins/europmc.mjs';
import * as tcia from './plugins/tcia.mjs';

const PLUGINS = {
  wikimedia,
  'wikimedia-radiopaedia': wikimediaRadiopaedia,
  openi,
  europmc,
  tcia
};

/** 来源 ID → 插件名 */
const SOURCE_PLUGIN_MAP = {
  'wikimedia-commons': 'wikimedia',
  openi: 'openi',
  pmc: 'openi',
  'nlm-open-access': 'openi',
  'biomed-central': 'europmc',
  tcia: 'tcia',
  'tcia-collections': 'tcia',
  'lidc-idri': 'tcia',
  'radiopaedia-commons': 'wikimedia-radiopaedia'
};

export function getSource(id) {
  return SOURCE_BY_ID[id] || null;
}

export function getPluginForSource(sourceId) {
  const src = getSource(sourceId);
  if (!src) return null;
  const pluginName = src.plugin || SOURCE_PLUGIN_MAP[sourceId];
  return pluginName ? PLUGINS[pluginName] || null : null;
}

export function catalog(opts = {}) {
  return listSources(opts).map(s => ({
    id: s.id,
    name: s.name,
    nameZh: s.nameZh,
    category: s.category,
    integration: s.integration,
    homepage: s.homepage,
    license: s.license,
    hasApi: !!(s.plugin || SOURCE_PLUGIN_MAP[s.id]),
    apiEndpoint: s.api?.endpoint || null,
    notes: s.notes || null
  }));
}

export function buildLink(sourceId, query, disease = {}) {
  const src = getSource(sourceId);
  if (!src) return null;
  const url = buildSearchUrl(src.searchUrl, query, disease);
  return {
    sourceId,
    name: src.name,
    nameZh: src.nameZh,
    url,
    license: src.license,
    integration: src.integration
  };
}

export async function searchSource(sourceId, query, opts = {}) {
  const src = getSource(sourceId);
  if (!src) throw new Error(`unknown source: ${sourceId}`);

  const plugin = getPluginForSource(sourceId);
  if (!plugin?.search) {
    const link = buildLink(sourceId, query);
    return { sourceId, mode: 'search-link', link, hits: [] };
  }

  const hits = await plugin.search(query, { ...opts, sourceId });
  return { sourceId, mode: 'api', hits };
}

export async function searchAll(query, opts = {}) {
  const sourceIds = opts.sources?.length
    ? opts.sources
    : listSources({ apiOnly: true }).map(s => s.id).filter(id => getPluginForSource(id));

  const limit = opts.limit ?? 5;
  const results = [];
  const errors = [];

  for (const sourceId of sourceIds) {
    try {
      const r = await searchSource(sourceId, query, { limit });
      results.push(r);
    } catch (e) {
      errors.push({ sourceId, error: e.message });
    }
  }

  return { query, results, errors };
}

export async function healthCheck(sourceId) {
  if (sourceId) {
    const plugin = getPluginForSource(sourceId);
    const src = getSource(sourceId);
    if (!src) return { sourceId, ok: false, error: 'unknown' };
    if (!plugin?.health) {
      return { sourceId, ok: true, mode: src.integration, message: 'search-link only' };
    }
    try {
      const h = await plugin.health();
      return { sourceId, ...h };
    } catch (e) {
      return { sourceId, ok: false, error: e.message };
    }
  }

  const apiSources = listSources({ apiOnly: true });
  const checks = [];
  for (const s of apiSources) {
    checks.push(await healthCheck(s.id));
  }
  return { at: new Date().toISOString(), checks };
}

export function cite(sourceId, hit) {
  const src = getSource(sourceId);
  return formatCitation(hit, src);
}

export { listSources, SOURCE_BY_ID, PLUGINS };
