function authConnectionHint() {
  if (location.protocol === 'file:') {
    return '请勿直接双击 HTML 文件。请先运行项目里的「启动后台.bat」，再在浏览器打开：http://localhost:3000/login.html';
  }
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    if (location.port && location.port !== '3000') {
      return '当前页面地址无法连接后台 API。请运行「启动后台.bat」后访问 http://localhost:3000/login.html';
    }
    return '无法连接后台服务。请确认已运行「启动后台.bat」，并保持该窗口不要关闭。';
  }
  return '无法连接登录接口。若使用 Vercel 部署，请确认 API 已启用，并在项目环境变量中设置 ADMIN_USERNAME、ADMIN_PASSWORD、SESSION_SECRET。';
}

async function authApi(url, opts) {
  if (location.protocol === 'file:') {
    throw new Error(authConnectionHint());
  }
  let res;
  try {
    res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      ...opts
    });
  } catch {
    throw new Error(authConnectionHint());
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || '请求失败');
  return data;
}

function showMsg(el, text, ok) {
  if (!el) return;
  el.textContent = text;
  el.className = 'msg ' + (ok ? 'ok' : 'err');
}

function redirectAfterLogin(user) {
  const params = new URLSearchParams(location.search);
  const next = params.get('next');
  if (next && next.startsWith('/') && !next.startsWith('//')) {
    location.href = next;
    return;
  }
  if (user?.isAdmin) {
    location.href = '/admin/';
    return;
  }
  location.href = '/';
}
