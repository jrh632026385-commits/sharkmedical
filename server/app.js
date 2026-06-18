import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createAuthRouter,
  createContentRouter,
  createSessionMiddleware
} from './routes.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

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

  if (!process.env.VERCEL) {
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
