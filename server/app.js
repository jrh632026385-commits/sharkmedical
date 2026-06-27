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
import { createExternalImageRouter } from './lib/externalImageProxy.js';
import { createImageLoaderRouter } from './lib/imageLoaderRoute.js';
import { readSiteData } from './lib/dataStore.js';
import { toPublicSiteData } from './lib/publicSiteData.js';
import { readCatalogFile, readGalleriesFile } from './lib/contentSlices.js';
import { compressionMiddleware, sendJsonFile } from './lib/compression.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');

dotenv.config();
dotenv.config({ path: path.join(root, 'data', 'local.env') });

const CACHEABLE_DATA = /^site-(catalog|galleries|data-lite|disease-details|nav-fallback)\.json$/i;

function setPublicJsonCache(res, maxAge = 120) {
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
}

export function createApp() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'shark2024';
  const sessionSecret = process.env.SESSION_SECRET || 'shark-medical-dev-secret-change-me';

  const app = express();
  const sessionMiddleware = createSessionMiddleware(sessionSecret);

  app.set('trust proxy', 1);
  app.use(compressionMiddleware());
  app.use(express.json({ limit: '12mb' }));
  app.use('/api', sessionMiddleware);
  app.use('/api/auth', createAuthRouter({ bootstrapUsername: username, bootstrapPassword: password }));
  app.use('/api/content', createContentRouter());
  app.use('/api/wikimedia', createWikimediaRouter());
  app.use('/api/openi', createOpeniRouter());
  app.use('/api/img', createExternalImageRouter());
  app.use(createImageLoaderRouter());

  if (!process.env.VERCEL) {
    app.get('/data/site-catalog.json', (req, res) => {
      const data = readCatalogFile();
      if (!data) return res.status(404).json({ ok: false, error: 'catalog 不存在，请运行 npm run generate-site-lite' });
      sendJsonFile(res, toPublicSiteData(data));
    });

    app.get('/data/site-galleries.json', (req, res) => {
      const data = readGalleriesFile();
      if (!data) return res.status(404).json({ ok: false, error: 'galleries 不存在，请运行 npm run generate-site-lite' });
      sendJsonFile(res, data);
    });

    app.get('/data/site-data.json', async (req, res) => {
      try {
        const data = await readSiteData();
        if (!data) return res.status(404).json({ ok: false, error: '数据不存在' });
        sendJsonFile(res, toPublicSiteData(data), 60);
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    app.use('/data', express.static(dataDir, {
      setHeaders(res, filePath) {
        const name = path.basename(filePath);
        if (CACHEABLE_DATA.test(name)) setPublicJsonCache(res, 120);
        else if (name.endsWith('.json')) res.setHeader('Cache-Control', 'no-store');
      }
    }));

    app.use('/admin', express.static(path.join(root, 'admin'), {
      index: 'index.html',
      setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
      }
    }));

    app.use(express.static(root, {
      index: 'index.html',
      extensions: ['html'],
      setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
        else if (/\.(js|css|svg|png|jpg|webp|woff2?)$/i.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      }
    }));

    app.get('/', (req, res) => {
      res.sendFile(path.join(root, 'index.html'));
    });
  }

  return app;
}
