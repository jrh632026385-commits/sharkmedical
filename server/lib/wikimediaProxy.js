import express from 'express';
import { wikimediaQuery } from '../../data/wikimedia-api.mjs';
import {
  clampImageWidth,
  sendWikimediaImage
} from './imageProxy.js';

/**
 * GET /api/wikimedia/query?action=query&prop=...
 * GET /api/wikimedia/img?file=...&width=800
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

  router.get('/img', async (req, res) => {
    const file = String(req.query.file || '').trim();
    if (!file) {
      res.status(400).json({ ok: false, error: 'missing file' });
      return;
    }

    const width = clampImageWidth(req.query.width, 800);

    try {
      await sendWikimediaImage(res, file, width);
    } catch (err) {
      res.status(err.status || 502).json({
        ok: false,
        error: err.message || 'Wikimedia 图片代理失败'
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
