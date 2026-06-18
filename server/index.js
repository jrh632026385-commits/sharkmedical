import os from 'os';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const username = process.env.ADMIN_USERNAME || 'admin';

function getLanAddresses() {
  const nets = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) ips.push(net.address);
    }
  }
  return ips;
}

const app = createApp();

app.listen(port, host, () => {
  const lanIps = getLanAddresses();
  console.log('');
  console.log('鲨鱼医学 · 本地服务已启动');
  console.log(`  本机前台: http://localhost:${port}/`);
  console.log(`  登录页:   http://localhost:${port}/login.html`);
  console.log(`  本机后台: http://localhost:${port}/admin/`);
  if (lanIps.length) {
    console.log('  手机/平板（需同一 WiFi）:');
    lanIps.forEach(ip => console.log(`    http://${ip}:${port}/`));
  }
  console.log(`  默认管理员: ${username}`);
  console.log('');
});
