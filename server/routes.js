import express from 'express';
import cookieSession from 'cookie-session';
import { readSiteData, writeSiteData } from './lib/dataStore.js';
import {
  authenticateUser,
  ensureBootstrapAdmin,
  listPublicUsers,
  publicUser,
  registerUser
} from './lib/userStore.js';
import { canPersistWrites, isKvEnabled } from './lib/kv.js';

export function createSessionMiddleware(sessionSecret) {
  return cookieSession({
    name: 'shark.sid',
    keys: [sessionSecret],
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || !!process.env.VERCEL
  });
}

export function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ ok: false, error: '请先登录' });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (req.session?.role === 'admin') return next();
  res.status(403).json({ ok: false, error: '需要管理员权限' });
}

function setSessionUser(req, user) {
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.role = user.role;
}

export function createAuthRouter({ bootstrapUsername, bootstrapPassword }) {
  const router = express.Router();

  router.get('/status', (req, res) => {
    res.json({
      ok: true,
      persist: canPersistWrites(),
      kv: isKvEnabled(),
      vercel: !!process.env.VERCEL
    });
  });

  router.post('/register', async (req, res) => {
    try {
      await ensureBootstrapAdmin(bootstrapUsername, bootstrapPassword);
      const user = await registerUser({
        username: req.body?.username,
        password: req.body?.password,
        email: req.body?.email
      });
      setSessionUser(req, user);
      res.json({ ok: true, user: publicUser(user) });
    } catch (err) {
      res.status(err.status || 400).json({ ok: false, error: err.message || '注册失败' });
    }
  });

  router.post('/login', async (req, res) => {
    const username = String(req.body?.username || '').trim();
    const password = String(req.body?.password || '');
    const user = await authenticateUser(username, password, bootstrapUsername, bootstrapPassword);
    if (!user) {
      return res.status(401).json({ ok: false, error: '用户名或密码错误' });
    }
    setSessionUser(req, user);
    res.json({ ok: true, user: publicUser(user) });
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.json({ ok: true });
  });

  router.get('/me', (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ ok: false, error: '未登录' });
    }
    res.json({
      ok: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
        isAdmin: req.session.role === 'admin'
      }
    });
  });

  router.get('/users', requireAdmin, async (req, res) => {
    try {
      const users = await listPublicUsers();
      res.json({
        ok: true,
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        members: users.filter(u => u.role === 'user').length,
        users
      });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message || '读取用户失败' });
    }
  });

  return router;
}

export function createContentRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const data = await readSiteData();
    if (!data) {
      return res.status(404).json({ ok: false, error: '尚未初始化数据，请先运行 npm run extract' });
    }
    res.json(data);
  });

  router.put('/', requireAdmin, async (req, res) => {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ ok: false, error: '无效的数据格式' });
      }
      const saved = await writeSiteData(body);
      res.json({ ok: true, updatedAt: saved.updatedAt });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message });
    }
  });

  router.patch('/diseases', requireAdmin, async (req, res) => {
    try {
      const data = await readSiteData();
      if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ ok: false, error: 'diseases 必须是数组' });
      }
      data.diseases = req.body;
      const saved = await writeSiteData(data);
      res.json({ ok: true, count: saved.diseases.length, updatedAt: saved.updatedAt });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message });
    }
  });

  router.patch('/galleries', requireAdmin, async (req, res) => {
    try {
      const data = await readSiteData();
      if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
      const { diseaseGalleries, galleryAnnTpl } = req.body || {};
      if (diseaseGalleries) data.diseaseGalleries = diseaseGalleries;
      if (galleryAnnTpl) data.galleryAnnTpl = galleryAnnTpl;
      const saved = await writeSiteData(data);
      res.json({ ok: true, updatedAt: saved.updatedAt });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message });
    }
  });

  router.patch('/films', requireAdmin, async (req, res) => {
    try {
      const data = await readSiteData();
      if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ ok: false, error: 'filmData 必须是对象' });
      }
      data.filmData = req.body;
      const saved = await writeSiteData(data);
      res.json({ ok: true, updatedAt: saved.updatedAt });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message });
    }
  });

  return router;
}
