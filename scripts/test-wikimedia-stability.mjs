/**
 * Wikimedia 在线补充稳定性压测（模拟 supplement 脚本请求模式）
 * node scripts/test-wikimedia-stability.mjs [--n=20]
 */
import { searchCommonsFiles, wikimediaQuery } from '../data/wikimedia-api.mjs';

const n = Number(process.argv.find(a => a.startsWith('--n='))?.slice(4) || 20);

const QUERIES = [
  'Galeazzi fracture radiograph',
  'Enchondroma radiograph',
  'Jefferson fracture atlas C1',
  'pigmented villonodular synovitis MRI',
  'rickets radiograph metaphysis',
  'Bankart lesion MRI',
  'lipoma MRI soft tissue',
  'Hangman fracture C2',
  'Charcot foot radiograph',
  'DISH spine radiograph',
  'Osteoma radiograph',
  'synovial chondromatosis knee',
  'Blount disease tibia',
  'tenosynovial giant cell tumor MRI',
  'Maisonneuve fracture radiograph',
  'Brown tumor hyperparathyroidism',
  'Paget disease bone radiograph',
  'spondylolysis pars defect',
  'Morton neuroma MRI',
  'compartment syndrome MRI'
];

async function main() {
  console.log(`=== Wikimedia 稳定性测试 (${n} 次 search) ===\n`);

  const healthStart = Date.now();
  await wikimediaQuery({ action: 'query', meta: 'siteinfo', siprop: 'general' });
  console.log(`health/siteinfo: OK (${Date.now() - healthStart}ms)\n`);

  const results = [];
  const list = QUERIES.slice(0, n);

  for (let i = 0; i < list.length; i++) {
    const q = list[i];
    const t0 = Date.now();
    try {
      const hits = await searchCommonsFiles(q, 5);
      const ms = Date.now() - t0;
      results.push({ ok: true, q, ms, hits: hits.length });
      console.log(`[${i + 1}/${list.length}] OK ${ms}ms hits=${hits.length} — ${q.slice(0, 50)}`);
    } catch (err) {
      const ms = Date.now() - t0;
      results.push({ ok: false, q, ms, err: err.message });
      console.log(`[${i + 1}/${list.length}] FAIL ${ms}ms — ${q.slice(0, 40)} | ${err.message}`);
    }
  }

  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);
  const latencies = ok.map(r => r.ms);
  const avg = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
  const p95 = latencies.length ? latencies.sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)] : 0;
  const rate429 = fail.filter(r => /429/.test(r.err)).length;

  console.log('\n=== 汇总 ===');
  console.log('成功:', ok.length, '/', list.length, `(${(ok.length / list.length * 100).toFixed(1)}%)`);
  console.log('失败:', fail.length, rate429 ? `(其中 HTTP 429: ${rate429})` : '');
  console.log('延迟 avg/p95:', avg + 'ms', '/', p95 + 'ms');
  if (fail.length) {
    console.log('\n失败明细:');
    fail.forEach(r => console.log(' ', r.q, '→', r.err));
  }

  const stable = ok.length === list.length && rate429 === 0;
  console.log('\n结论:', stable ? '稳定，可跑在线补充' : '不稳定，建议先排查代理/限流后再批量补充');
  process.exitCode = stable ? 0 : 1;
}

main().catch(e => {
  console.error('FATAL:', e.message);
  process.exit(2);
});
