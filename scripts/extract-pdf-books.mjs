/**
 * 提取桌面四本 PDF 的元数据与前若干页文本，用于识别书目与建立索引
 */
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const BOOKS = [
  {
    id: 'musculoskeletal-imaging',
    file: 'C:/Users/Administrator/Desktop/9787030802002_000020290283_15600470.pdf'
  },
  {
    id: 'orthopedics-v2-a',
    file: 'C:/Users/Administrator/Desktop/15485264(1).pdf'
  },
  {
    id: 'trauma-imaging',
    file: 'C:/Users/Administrator/Desktop/骨伤科影像学_14996356(1).pdf'
  },
  {
    id: 'orthopedics-v2-b',
    file: 'C:/Users/Administrator/Desktop/15508409.pdf'
  }
];

const outDir = path.join(process.cwd(), 'data', 'pdf-sources');

async function extractBook(book) {
  const buf = fs.readFileSync(book.file);
  const parser = new PDFParse({ data: buf });
  const info = await parser.getInfo();
  const textResult = await parser.getText({ first: 5 });
  await parser.destroy();

  const meta = {
    id: book.id,
    file: book.file,
    pages: info.total,
    info: info.info || {},
    metadata: info.metadata || null,
    sampleText: (textResult.text || '').slice(0, 4000)
  };
  return meta;
}

fs.mkdirSync(outDir, { recursive: true });
const all = [];
for (const book of BOOKS) {
  console.log('extracting', book.id, '...');
  const meta = await extractBook(book);
  all.push(meta);
  fs.writeFileSync(path.join(outDir, `${book.id}.meta.json`), JSON.stringify(meta, null, 2), 'utf8');
  console.log('  pages:', meta.pages);
  console.log('  title:', meta.info?.Title || meta.sampleText.slice(0, 80));
}

fs.writeFileSync(path.join(outDir, 'books-index.json'), JSON.stringify(all, null, 2), 'utf8');
console.log('done ->', outDir);
