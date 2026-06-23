import express from 'express';
import { wikimediaQuery } from '../../data/wikimedia-api.mjs';

/**
 * GET /api/wikimedia/query?action=query&prop=...
 * 代理 Wikimedia Commons API，供浏览器与脚本在直连失败时使用
 */
export function createWikimediaRouter() {
  const router = express.Router();

  router.get('/query', async (req, res) => {
    try {
      const params = { ...req.query };
      delete params._;
      const data = await wikimediaQuery(params);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.json(data);
    } catch (err) {
      res.status(502).json({
        ok: false,
        error: err.message || 'Wikimedia API 请求失败'
      });
    }
  });

  router.get('/health', async (req, res) => {
    try {
      const data = await wikimediaQuery({ action: 'query', meta: 'siteinfo', siprop: 'general' });
      res.json({
        ok: true,
        sitename: data.query?.general?.sitename || data.query?.meta?.sitename || 'Wikimedia Commons'
      });
    } catch (err) {
      res.status(502).json({ ok: false, error: err.message });
    }
  });

  return router;
}
