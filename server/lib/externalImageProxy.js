import express from 'express';
import { proxyImageBytes } from './imageProxy.js';

const USER_AGENT = 'SharkMedical/1.0 (medical imaging atlas; educational) NodeJS';

/** 允许代理的外链图床（防 SSRF） */
const ALLOWED_HOSTS =
  /^(?:.+\.)?(?:bdstatic\.com|baidu\.com|bcebos\.com|itc\.cn|dxycdn\.com|douyinpic\.com|gtimg\.com|zhimg\.com|sohu\.com|xjtu\.edu\.cn|chinanews\.com|sina\.com|yxppt\.com|g-medon\.com|yxj\.org\.cn|bilibili\.com|europepmc\.org|ncbi\.nlm\.nih\.gov|nih\.gov|radiopaedia\.org|ultrasoundcases\.info|wikimedia\.org|upload\.wikimedia\.org|mm\.biz\.qq\.com|mmbiz\.qpic\.cn)$/i;

function resolveTarget(rawUrl) {
  const u = new URL(String(rawUrl || ''));
  if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error('invalid protocol');
  if (!ALLOWED_HOSTS.test(u.hostname)) throw new Error('forbidden host');
  return u.toString();
}

/**
 * GET /api/img?url=https://...
 * 代理外链医学影像，本地磁盘缓存 + 绕过浏览器 Referer/CORS/防盗链限制。
 */
export function createExternalImageRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    let target;
    try {
      target = resolveTarget(req.query.url);
    } catch (err) {
      res.status(400).json({ ok: false, error: err.message });
      return;
    }

    try {
      await proxyImageBytes(res, {
        namespace: 'external',
        cacheId: target,
        targetUrl: target,
        headers: {
          Referer: `${new URL(target).origin}/`
        },
        userAgent: USER_AGENT
      });
    } catch (err) {
      res.status(err.status || 502).json({ ok: false, error: err.message || 'image proxy failed' });
    }
  });

  return router;
}
