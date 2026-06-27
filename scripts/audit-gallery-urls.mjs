import fs from 'fs';

const galleries = JSON.parse(fs.readFileSync('data/site-galleries.json', 'utf8')).diseaseGalleries;
let total = 0;
let openiNoUrl = 0;
let nonWikiNoUrl = 0;
let hasUrl = 0;
const samples = { openiNoUrl: [], nonWikiNoUrl: [], external: [] };

for (const [type, arr] of Object.entries(galleries || {})) {
  for (const item of arr || []) {
    total++;
    const file = String(item.file || '');
    const url = String(item.url || '');
    if (url) hasUrl++;
    if (file.startsWith('openi__') && !url) {
      openiNoUrl++;
      if (samples.openiNoUrl.length < 8) samples.openiNoUrl.push({ type, file });
    }
    if (/^(baiduimg__|europmcfig__|cnkiepmc__|uscase__|baike__|dxy__|cmacsr__|eduweb__)/i.test(file) && !url) {
      nonWikiNoUrl++;
      if (samples.nonWikiNoUrl.length < 8) samples.nonWikiNoUrl.push({ type, file });
    }
    if (url && !/commons\.wikimedia|openi\.nlm\.nih/i.test(url) && samples.external.length < 8) {
      samples.external.push({ type, file, url: url.slice(0, 120) });
    }
  }
}

console.log(JSON.stringify({ total, hasUrl, openiNoUrl, nonWikiNoUrl, samples }, null, 2));
