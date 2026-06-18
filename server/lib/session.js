import crypto from 'crypto';

export const SESSION_COOKIE = 'shark.sid';
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

function fromB64url(str) {
  return Buffer.from(str, 'base64url');
}

function signPayload(payload, secret) {
  const data = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return JSON.parse(fromB64url(data).toString('utf8'));
  } catch {
    return null;
  }
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=');
    if (idx <= 0) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  }
  return out;
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: MAX_AGE_MS,
    path: '/',
    secure: process.env.VERCEL ? false : process.env.NODE_ENV === 'production'
  };
}

export function createSessionMiddleware(sessionSecret) {
  return (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    const parsed = verifyToken(cookies[SESSION_COOKIE], sessionSecret);
    req.session = parsed ? { ...parsed } : {};
    req._sessionSecret = sessionSecret;

    const origJson = res.json.bind(res);
    res.json = body => {
      flushSessionCookie(req, res);
      return origJson(body);
    };

    const origEnd = res.end.bind(res);
    res.end = (...args) => {
      flushSessionCookie(req, res);
      return origEnd(...args);
    };

    next();
  };
}

function flushSessionCookie(req, res) {
  if (req._sessionFlushed) return;
  if (req._sessionCleared) {
    res.clearCookie(SESSION_COOKIE, { path: '/' });
    req._sessionFlushed = true;
    return;
  }
  if (!req._sessionDirty || !req.session?.userId) return;
  const token = signPayload({
    userId: req.session.userId,
    username: req.session.username,
    role: req.session.role
  }, req._sessionSecret);
  res.cookie(SESSION_COOKIE, token, cookieOptions());
  req._sessionFlushed = true;
}

export function setSessionUser(req, user) {
  req.session = {
    userId: user.id,
    username: user.username,
    role: user.role
  };
  req._sessionDirty = true;
}

export function clearSession(req) {
  req.session = {};
  req._sessionCleared = true;
  req._sessionDirty = false;
}
