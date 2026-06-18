import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'site-data.json'), 'utf8'));

const base = process.env.RESTORE_URL || 'https://shark-medical.vercel.app';
const user = process.env.ADMIN_USERNAME || 'admin';
const pass = process.env.ADMIN_PASSWORD || 'shark2024';

const login = await fetch(`${base}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: user, password: pass })
});
const cookie = login.headers.get('set-cookie')?.split(';')[0];
if (!cookie) throw new Error('login failed: no cookie');

const patch = await fetch(`${base}/api/content/diseases`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json', Cookie: cookie },
  body: JSON.stringify(data.diseases)
});
const out = await patch.json();
if (!patch.ok) throw new Error(out.error || patch.statusText);
console.log('restored', out.count, 'diseases at', out.updatedAt);
