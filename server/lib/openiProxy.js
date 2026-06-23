import express from 'express';
import { fetch as undiciFetch } from 'undici';
import { getDispatcher } from '../../data/wikimedia-api.mjs';
import { OPENI_BASE, OPENI_USER_AGENT } from '../../data/openi-api.mjs';

const ALLOWED_PATH_PREFIX = '/imgs/';

function resolveTarget(query) {
  const { url, path } = query || {};

  if (url) {
    const u = new URL(String(url));
    if (u.hostname !== 'openi.nlm.nih.gov') throw new Error('forbidden host');
    if (u.protocol !== 'https:') throw new Error('https only');
    if (!u.pathname.startsWith(ALLOWED_PATH_PREFIX)) throw new Error('invalid path');
    return u.toString();
  }

  if (path) {
    const p = String(path);
    if (!p.startsWith(ALLOWED_PATH_PREFIX)) throw new Error('invalid path');
    if (p.includes('..')) throw new Error('invalid path');
    return `${OPENI_BASE}${p}`;
  }

  throw new Error('missing url or path');
}

/**
 * GET /api/openi/img?path=/imgs/512/.../file.png
 * GET /api/openi/img?url=https://openi.nlm.nih.gov/imgs/...
 *
 * 代理 Open-i 影像字节，供浏览器在无法直连 NIH 时使用（与 Wikimedia API 代理同理）。
 */
export function createOpeniRouter() {
  const router = express.Router();

  router.get('/img', async (req, res) => {
    let target;
    try {
      target = resolveTarget(req.query);
    } catch (err) {
      res.status(400).json({ ok: false, error: err.message });
      return;
    }

    try {
      const dispatcher = await getDispatcher();
      const upstream = await undiciFetch(target, {
        method: 'GET',
        headers: {
          'User-Agent': OPENI_USER_AGENT,
          Accept: 'image/*,*/*;q=0.8'
        },
        redirect: 'follow',
        dispatcher
      });

      if (!upstream.ok) {
        res.status(upstream.status).json({
          ok: false,
          error: `Open-i upstream HTTP ${upstream.status}`
        });
        return;
      }

      const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
      if (/text\/html/i.test(contentType)) {
        res.status(502).json({ ok: false, error: 'Open-i 返回 HTML（非图片）' });
        return;
      }

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      if (upstream.headers.get('content-length')) {
        res.setHeader('Content-Length', upstream.headers.get('content-length'));
      }

      const body = Buffer.from(await upstream.arrayBuffer());
      res.send(body);
    } catch (err) {
      res.status(502).json({
        ok: false,
        error: err.message || 'Open-i 图片代理失败'
      });
    }
  });

  router.get('/health', async (req, res) => {
    const sample = `${OPENI_BASE}/imgs/512/318/4736529/PMC4736529_CCR3-4-107-g001.png`;
    try {
      const dispatcher = await getDispatcher();
      const upstream = await undiciFetch(sample, {
        method: 'HEAD',
        headers: { 'User-Agent': OPENI_USER_AGENT },
        dispatcher
      });
      res.json({
        ok: upstream.ok,
        status: upstream.status,
        sample
      });
    } catch (err) {
      res.status(502).json({ ok: false, error: err.message, sample });
    }
  });

  return router;
}
