import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createAuthRouter,
  createContentRouter,
  createSessionMiddleware
} from './routes.js';
import { createWikimediaRouter } from './lib/wikimediaProxy.js';
import { createOpeniRouter } from './lib/openiProxy.js';
import { readSiteData } from './lib/dataStore.js';
import { toPublicSiteData } from './lib/publicSiteData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

dotenv.config();
dotenv.config({ path: path.join(root, 'data', 'local.env') });

export function createApp() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'shark2024';
  const sessionSecret = process.env.SESSION_SECRET || 'shark-medical-dev-secret-change-me';

  const app = express();
  const sessionMiddleware = createSessionMiddleware(sessionSecret);

  // Vercel / 反向代理后需信任 X-Forwarded-Proto，否则 secure Cookie 可能无法写入
  app.set('trust proxy', 1);

  app.use(express.json({ limit: '12mb' }));
  app.use('/api', sessionMiddleware);
  app.use('/api/auth', createAuthRouter({ bootstrapUsername: username, bootstrapPassword: password }));
  app.use('/api/content', createContentRouter());
  app.use('/api/wikimedia', createWikimediaRouter());
  app.use('/api/openi', createOpeniRouter());

  if (!process.env.VERCEL) {
    app.get('/data/site-data.json', async (req, res) => {
      try {
        const data = await readSiteData();
        if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
        res.setHeader('Cache-Control', 'no-store');
        res.json(toPublicSiteData(data));
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });
    app.use('/data', express.static(path.join(root, 'data'), {
      setHeaders(res) {
        res.setHeader('Cache-Control', 'no-store');
      }
    }));
    app.use('/admin', express.static(path.join(root, 'admin'), { index: 'index.html' }));
    app.use(express.static(root, { index: 'index.html', extensions: ['html'] }));
    app.get('/', (req, res) => {
      res.sendFile(path.join(root, 'index.html'));
    });
  }

  return app;
}
