/**
 * 生成影像来源注册表 JSON 报告
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { catalog, healthCheck } from '../data/imaging-sources/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'data', 'imaging-sources-catalog.json');

const health = await healthCheck().catch(e => ({ error: e.message }));
const report = {
  generatedAt: new Date().toISOString(),
  total: catalog().length,
  apiCapable: catalog({ apiOnly: true }).length,
  byCategory: {},
  sources: catalog(),
  health
};

for (const s of report.sources) {
  report.byCategory[s.category] = (report.byCategory[s.category] || 0) + 1;
}

fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log('written:', outPath);
console.log('total:', report.total, '| api:', report.apiCapable);
