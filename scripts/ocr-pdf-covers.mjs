/**
 * 对扫描版 PDF 首页 OCR，识别书名
 */
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { createWorker } from 'tesseract.js';

const files = [
  ['orthopedics-v2-a', 'C:/Users/Administrator/Desktop/15485264(1).pdf'],
  ['trauma-imaging', 'C:/Users/Administrator/Desktop/骨伤科影像学_14996356(1).pdf'],
  ['injury-imaging-guide', 'C:/Users/Administrator/Desktop/15508409.pdf']
];

const outDir = path.join(process.cwd(), 'data', 'pdf-sources', 'ocr-samples');
fs.mkdirSync(outDir, { recursive: true });

const worker = await createWorker('chi_sim');
worker.setParameters({ tessedit_pageseg_mode: '6' });

for (const [id, file] of files) {
  console.log('OCR', id);
  const parser = new PDFParse({ data: fs.readFileSync(file) });
  const shot = await parser.getScreenshot({ partial: [1, 2, 3], scale: 2 });
  await parser.destroy();
  let text = '';
  for (const page of shot.pages || []) {
    const imgPath = path.join(outDir, `${id}-p${page.pageNumber}.png`);
    fs.writeFileSync(imgPath, page.data);
    const res = await worker.recognize(imgPath);
    text += `\n--- page ${page.pageNumber} ---\n${res.data.text}\n`;
  }
  fs.writeFileSync(path.join(outDir, `${id}.ocr.txt`), text, 'utf8');
  console.log(text.slice(0, 500));
}

await worker.terminate();
console.log('done', outDir);
