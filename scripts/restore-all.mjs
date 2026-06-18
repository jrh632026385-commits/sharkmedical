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
  body: JSON.stringify({ username: user, password: pass }),
  signal: AbortSignal.timeout(120000)
});
const cookie = login.headers.get('set-cookie')?.split(';')[0];
if (!cookie) throw new Error('login failed: ' + (await login.text()));

async function patch(url, body) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180000)
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(out.error || res.statusText);
  return out;
}

const put = await fetch(`${base}/api/content`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Cookie: cookie },
  body: JSON.stringify(data),
  signal: AbortSignal.timeout(300000)
});
const out = await put.json().catch(() => ({}));
if (!put.ok) throw new Error(out.error || put.statusText);

console.log(
  'restored full site-data:',
  data.diseases.length,
  'diseases,',
  Object.keys(data.diseaseGalleries).length,
  'galleries,',
  Object.keys(data.diseaseDetails||{}).length,
  'details,',
  Object.keys(data.imageAttribRegistry||{}).length,
  'attribs at',
  out.updatedAt
);
