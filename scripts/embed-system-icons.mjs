/**
 * 将 data/system-icons.mjs 内联到 index.html 的 SYS_ICON_SVGS
 * node scripts/embed-system-icons.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYS_ICON_SVGS } from '../data/system-icons.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const block = `const SYS_ICON_SVGS=${JSON.stringify(SYS_ICON_SVGS, null, 2)};`;

if (!html.includes('const SYS_ICON_SVGS=')) {
  html = html.replace(
    'function systemHasSubNav(sys){return Boolean(SYS_SUBNAV[sys]);}',
    `${block}\nfunction systemHasSubNav(sys){return Boolean(SYS_SUBNAV[sys]);}`
  );
} else {
  html = html.replace(/const SYS_ICON_SVGS=\{[\s\S]*?\};\n/, `${block}\n`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('embed-system-icons done');
