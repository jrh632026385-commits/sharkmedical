/**
 * 提取《骨肌系统影像诊断》全书可检索文本
 */
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const file = 'C:/Users/Administrator/Desktop/9787030802002_000020290283_15600470.pdf';
const outDir = path.join(process.cwd(), 'data', 'pdf-sources');
fs.mkdirSync(outDir, { recursive: true });

const parser = new PDFParse({ data: fs.readFileSync(file) });
const info = await parser.getInfo();
const chunks = [];

for (let p = 1; p <= info.total; p++) {
  const t = await parser.getText({ partial: [p] });
  const text = (t.text || '').trim();
  if (text) chunks.push({ page: p, text });
  if (p % 50 === 0) console.log('page', p);
}

await parser.destroy();

const fullText = chunks.map(c => `\n\n===== PAGE ${c.page} =====\n${c.text}`).join('\n');
fs.writeFileSync(path.join(outDir, 'musculoskeletal-imaging.full.txt'), fullText, 'utf8');
fs.writeFileSync(path.join(outDir, 'musculoskeletal-imaging.pages.json'), JSON.stringify(chunks, null, 2), 'utf8');
console.log('pages with text:', chunks.length, '/', info.total);
console.log('chars:', fullText.length);
