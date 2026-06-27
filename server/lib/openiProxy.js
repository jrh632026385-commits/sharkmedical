import express from 'express';
import { OPENI_BASE, OPENI_USER_AGENT } from '../../data/openi-api.mjs';
import { proxyImageBytes } from './imageProxy.js';
import { resolveOpeniImageUrl } from './openiResolve.js';

const ALLOWED_PATH_PREFIX = '/imgs/';

function resolveTarget(query) {
  const { url, path: pathParam, file } = query || {};

  if (file && String(file).startsWith('openi__')) {
    return { mode: 'file', file: String(file).trim() };
  }

  if (url) {
    const u = new URL(String(url));
    if (u.hostname !== 'openi.nlm.nih.gov') throw new Error('forbidden host');
    if (u.protocol !== 'https:') throw new Error('https only');
    if (!u.pathname.startsWith(ALLOWED_PATH_PREFIX)) throw new Error('invalid path');
    return { mode: 'url', target: u.toString() };
  }

  if (pathParam) {
    const p = String(pathParam);
    if (!p.startsWith(ALLOWED_PATH_PREFIX)) throw new Error('invalid path');
    if (p.includes('..')) throw new Error('invalid path');
    return { mode: 'url', target: `${OPENI_BASE}${p}` };
  }

  throw new Error('missing url, path, or file');
}

/**
 * GET /api/openi/img?path=/imgs/512/.../file.png
 * GET /api/openi/img?url=https://openi.nlm.nih.gov/imgs/...
 * GET /api/openi/img?file=openi__PMC123_fig.png
 */
export function createOpeniRouter() {
  const router = express.Router();

  router.get('/img', async (req, res) => {
    let resolved;
    try {
      resolved = resolveTarget(req.query);
    } catch (err) {
      res.status(400).json({ ok: false, error: err.message });
      return;
    }

    try {
      let targetUrl;
      let cacheId;

      if (resolved.mode === 'file') {
        targetUrl = await resolveOpeniImageUrl(resolved.file);
        if (!targetUrl) {
          res.status(404).json({ ok: false, error: 'Open-i 图片 URL 未找到' });
          return;
        }
        cacheId = targetUrl;
      } else {
        targetUrl = resolved.target;
        cacheId = targetUrl;
      }

      await proxyImageBytes(res, {
        namespace: 'openi',
        cacheId,
        targetUrl,
        userAgent: OPENI_USER_AGENT
      });
    } catch (err) {
      res.status(err.status || 502).json({
        ok: false,
        error: err.message || 'Open-i 图片代理失败'
      });
    }
  });

  router.get('/health', async (req, res) => {
    const sample = `${OPENI_BASE}/imgs/512/318/4736529/PMC4736529_CCR3-4-107-g001.png`;
    try {
      const { fetch: undiciFetch } = await import('undici');
      const { getDispatcher } = await import('../../data/wikimedia-api.mjs');
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
