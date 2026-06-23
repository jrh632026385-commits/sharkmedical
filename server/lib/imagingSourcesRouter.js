import express from 'express';
import {
  catalog,
  getSource,
  searchSource,
  searchAll,
  healthCheck,
  buildLink,
  cite
} from '../../data/imaging-sources/index.mjs';

/**
 * 统一影像来源引用接口
 *
 * GET  /api/imaging-sources              来源目录
 * GET  /api/imaging-sources/health       各 API 源健康检查
 * GET  /api/imaging-sources/link           生成检索链接 ?source=&q=
 * GET  /api/imaging-sources/search         单源检索 ?source=&q=&limit=
 * GET  /api/imaging-sources/search-all     多源并行 ?q=&sources=a,b&limit=
 * GET  /api/imaging-sources/cite           引用格式 ?source=&file=&title=
 */
export function createImagingSourcesRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const category = req.query.category || '';
    const apiOnly = req.query.apiOnly === '1' || req.query.apiOnly === 'true';
    res.json({
      ok: true,
      count: catalog({ category: category || undefined, apiOnly }).length,
      sources: catalog({ category: category || undefined, apiOnly })
    });
  });

  router.get('/health', async (req, res) => {
    try {
      const source = req.query.source || '';
      const data = await healthCheck(source || undefined);
      res.json({ ok: true, ...data });
    } catch (err) {
      res.status(502).json({ ok: false, error: err.message });
    }
  });

  router.get('/link', (req, res) => {
    const { source, q, query } = req.query;
    const term = q || query || '';
    if (!source) return res.status(400).json({ ok: false, error: 'missing source' });
    const link = buildLink(String(source), String(term));
    if (!link) return res.status(404).json({ ok: false, error: 'unknown source' });
    res.json({ ok: true, ...link });
  });

  router.get('/search', async (req, res) => {
    const { source, q, query, limit } = req.query;
    const term = q || query || '';
    if (!source || !term) {
      return res.status(400).json({ ok: false, error: 'missing source or q' });
    }
    try {
      const data = await searchSource(String(source), String(term), {
        limit: limit ? Number(limit) : 8
      });
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.json({ ok: true, query: term, ...data });
    } catch (err) {
      res.status(502).json({ ok: false, error: err.message });
    }
  });

  router.get('/search-all', async (req, res) => {
    const { q, query, limit, sources } = req.query;
    const term = q || query || '';
    if (!term) return res.status(400).json({ ok: false, error: 'missing q' });
    const sourceList = sources ? String(sources).split(',').map(s => s.trim()).filter(Boolean) : undefined;
    try {
      const data = await searchAll(String(term), {
        limit: limit ? Number(limit) : 5,
        sources: sourceList
      });
      res.setHeader('Cache-Control', 'public, max-age=1800');
      res.json({ ok: true, ...data });
    } catch (err) {
      res.status(502).json({ ok: false, error: err.message });
    }
  });

  router.get('/cite', (req, res) => {
    const { source, title, author, pageUrl, license, file } = req.query;
    if (!source) return res.status(400).json({ ok: false, error: 'missing source' });
    const src = getSource(String(source));
    if (!src) return res.status(404).json({ ok: false, error: 'unknown source' });
    const hit = {
      title: title || file || '',
      author: author || '',
      pageUrl: pageUrl || '',
      license: license || '',
      file: file || ''
    };
    res.json({ ok: true, source: source, citation: cite(String(source), hit) });
  });

  router.get('/:id', (req, res) => {
    const src = getSource(req.params.id);
    if (!src) return res.status(404).json({ ok: false, error: 'unknown source' });
    res.json({ ok: true, source: src });
  });

  return router;
}
