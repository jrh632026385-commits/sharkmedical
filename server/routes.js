import express from 'express';
import { readSiteData, writeSiteData } from './lib/dataStore.js';
import { toPublicSiteData } from './lib/publicSiteData.js';
import { readPublicCatalog, readPublicGalleries } from './lib/contentSlices.js';
import {
  authenticateUser,
  createStoredUser,
  deleteUserById,
  ensureBootstrapAdmin,
  listPublicUsers,
  publicUser,
  registerUser,
  updateUserRole
} from './lib/userStore.js';
import { canPersistWrites, isKvEnabled } from './lib/kv.js';
import { clearSession, createSessionMiddleware, setSessionUser } from './lib/session.js';

export { createSessionMiddleware };

export function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ ok: false, error: '请先登录' });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ ok: false, error: '登录已过期，请重新登录管理员账号' });
  }
  if (req.session.role === 'admin') return next();
  res.status(403).json({
    ok: false,
    error: '需要管理员权限：当前为普通用户账号，请退出后用管理员账号登录（见 .env 中 ADMIN_USERNAME / ADMIN_PASSWORD）'
  });
}

function setSessionUserOnReq(req, user) {
  setSessionUser(req, user);
}

export function createAuthRouter({ bootstrapUsername, bootstrapPassword }) {
  const router = express.Router();

  router.get('/status', (req, res) => {
    res.json({
      ok: true,
      persist: canPersistWrites(),
      kv: isKvEnabled(),
      vercel: !!process.env.VERCEL,
      build: 'session-v2'
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
      setSessionUserOnReq(req, user);
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
    setSessionUserOnReq(req, user);
    res.json({ ok: true, user: publicUser(user) });
  });

  router.post('/logout', (req, res) => {
    clearSession(req);
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

  router.post('/users', requireAdmin, async (req, res) => {
    try {
      const user = await createStoredUser({
        username: req.body?.username,
        password: req.body?.password,
        email: req.body?.email,
        role: req.body?.role
      });
      res.json({ ok: true, user: publicUser(user) });
    } catch (err) {
      res.status(err.status || 400).json({ ok: false, error: err.message || '创建用户失败' });
    }
  });

  router.delete('/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id || '').trim();
      if (id === req.session.userId) {
        return res.status(400).json({ ok: false, error: '无法删除当前登录账号' });
      }
      const user = await deleteUserById(id);
      res.json({ ok: true, user });
    } catch (err) {
      res.status(err.status || 400).json({ ok: false, error: err.message || '删除用户失败' });
    }
  });

  router.patch('/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = String(req.params.id || '').trim();
      const role = req.body?.role;
      if (role !== 'admin' && role !== 'user') {
        return res.status(400).json({ ok: false, error: 'role 必须是 admin 或 user' });
      }
      if (id === req.session.userId && role === 'user') {
        return res.status(400).json({ ok: false, error: '无法将当前登录账号降级为普通用户' });
      }
      const user = await updateUserRole(id, role);
      res.json({ ok: true, user });
    } catch (err) {
      res.status(err.status || 400).json({ ok: false, error: err.message || '更新用户失败' });
    }
  });

  return router;
}

export function createContentRouter() {
  const router = express.Router();

  router.get('/catalog', async (req, res) => {
    try {
      const data = await readPublicCatalog();
      if (!data) {
        return res.status(404).json({ ok: false, error: '尚未初始化数据，请先运行 npm run extract' });
      }
      res.setHeader('Cache-Control', 'public, max-age=120');
      res.json(data);
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  router.get('/galleries', async (req, res) => {
    try {
      const data = await readPublicGalleries();
      if (!data) {
        return res.status(404).json({ ok: false, error: '尚未初始化数据，请先运行 npm run extract' });
      }
      res.setHeader('Cache-Control', 'public, max-age=120');
      res.json(data);
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    const data = await readSiteData();
    if (!data) {
      return res.status(404).json({ ok: false, error: '尚未初始化数据，请先运行 npm run extract' });
    }
    const isAdmin = req.session?.role === 'admin';
    res.json(isAdmin ? data : toPublicSiteData(data));
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
      const { diseaseGalleries, galleryAnnTpl, imageAttribRegistry } = req.body || {};
      if (diseaseGalleries) data.diseaseGalleries = diseaseGalleries;
      if (galleryAnnTpl) data.galleryAnnTpl = galleryAnnTpl;
      if (imageAttribRegistry) data.imageAttribRegistry = imageAttribRegistry;
      const saved = await writeSiteData(data);
      res.json({ ok: true, updatedAt: saved.updatedAt });
    } catch (err) {
      res.status(err.status || 500).json({ ok: false, error: err.message });
    }
  });

  router.patch('/details', requireAdmin, async (req, res) => {
    try {
      const data = await readSiteData();
      if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ ok: false, error: 'diseaseDetails 必须是对象' });
      }
      data.diseaseDetails = req.body;
      const saved = await writeSiteData(data);
      res.json({ ok: true, count: Object.keys(saved.diseaseDetails || {}).length, updatedAt: saved.updatedAt });
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
