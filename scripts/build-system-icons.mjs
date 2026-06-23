/**
 * 生成 data/system-icons.js（供 index.html 引用）
 * node scripts/build-system-icons.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYS_ICON_SVGS } from '../data/system-icons.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'data', 'system-icons.js');

const body = Object.entries(SYS_ICON_SVGS)
  .map(([key, svg]) => `  ${JSON.stringify(key)}: ${JSON.stringify(svg)}`)
  .join(',\n\n');

const content = `/** 各系统分类 · 彩色 SVG 图标（自动生成，勿手改） */\nvar SYS_ICON_SVGS = {\n${body}\n};\n`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('build-system-icons done:', Object.keys(SYS_ICON_SVGS).length, 'icons');
