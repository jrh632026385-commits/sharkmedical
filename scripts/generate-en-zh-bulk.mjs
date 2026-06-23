/**
 * 从 _remaining-en.txt + 种子词库生成 en-zh-bulk.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATE, KEEP_LOWER, PHRASE_TRANSLATE } from './en-zh-bulk-seed.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remainingPath = path.join(__dirname, '_remaining-en.txt');

const remaining = fs
  .readFileSync(remainingPath, 'utf8')
  .trim()
  .split('\n')
  .map((line) => {
    const [c, w] = line.split('\t');
    return { c: +c, w };
  });

const entries = new Map();

function add(en, zh) {
  const cleaned = cleanZh(zh);
  if (!en || !cleaned || en.toLowerCase() === cleaned.toLowerCase()) return;
  if (KEEP_LOWER.has(en.toLowerCase())) return;
  const key = en.toLowerCase();
  if (!entries.has(key)) entries.set(key, [en, cleaned]);
}

function cleanZh(zh) {
  if (zh == null || typeof zh !== 'string') return null;
  const t = zh.trim();
  if (!t) return null;
  if (/^[\u4e00-\u9fff]/.test(t)) return t;
  if (/[\u4e00-\u9fff]/.test(t)) return t.trim();
  return null;
}

for (const [en, zh] of Object.entries(PHRASE_TRANSLATE)) add(en, zh);
for (const [en, zh] of Object.entries(TRANSLATE)) add(en, zh);

for (const { w } of remaining) {
  if (!w) continue;
  if (KEEP_LOWER.has(w.toLowerCase())) continue;
  const zh = TRANSLATE[w] ?? TRANSLATE[w.toLowerCase()];
  if (zh) add(w, zh);
}

const sorted = [...entries.values()].sort((a, b) => b[0].length - a[0].length);
const phrases = sorted.filter(([en]) => /[\s/'/-]/.test(en));
const words = sorted.filter(([en]) => !/[\s/'/-]/.test(en));

let out = '/** Auto-generated — 2+ 字母英文 → 中文批量映射 */\n';
out += `export const BULK_KEEP_LOWER = new Set(${JSON.stringify([...KEEP_LOWER].sort())});\n\n`;
out += 'export const BULK_PHRASES = [\n';
for (const [en, zh] of phrases) out += `  [${JSON.stringify(en)}, ${JSON.stringify(zh)}],\n`;
out += '];\n\nexport const BULK_WORDS = [\n';
for (const [en, zh] of words) out += `  [${JSON.stringify(en)}, ${JSON.stringify(zh)}],\n`;
out += '];\n';

fs.writeFileSync(path.join(__dirname, 'en-zh-bulk.mjs'), out, 'utf8');
console.log('generated en-zh-bulk.mjs');
console.log('  phrases:', phrases.length);
console.log('  words:', words.length);
console.log('  keep:', KEEP_LOWER.size);
