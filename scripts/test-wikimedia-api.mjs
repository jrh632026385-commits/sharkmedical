/**
 * 测试 Wikimedia API 连通性
 * node scripts/test-wikimedia-api.mjs
 */
import { searchCommonsFiles, wikimediaQuery } from '../data/wikimedia-api.mjs';

async function main() {
  console.log('1. siteinfo…');
  const info = await wikimediaQuery({ action: 'query', meta: 'siteinfo', siprop: 'general' });
  console.log('   OK:', info.query?.general?.sitename || info.query?.meta?.sitename);

  console.log('2. search "Galeazzi fracture X-ray"…');
  const hits = await searchCommonsFiles('Galeazzi fracture X-ray', 3);
  console.log('   hits:', hits.length);
  hits.forEach(h => console.log('   -', h.file, '|', h.license?.slice(0, 40)));
  console.log('done');
}

main().catch(err => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
