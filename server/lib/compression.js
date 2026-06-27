import zlib from 'zlib';

const THRESHOLD = 1024;

function shouldCompress(req, res) {
  if (req.method === 'HEAD') return false;
  const encoding = req.headers['accept-encoding'] || '';
  return /\bgzip\b/i.test(encoding) && !res.getHeader('Content-Encoding');
}

function gzipBody(res, body, contentType) {
  zlib.gzip(body, (err, compressed) => {
    if (err) {
      res.setHeader('Content-Type', contentType);
      res.end(body);
      return;
    }
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Length', compressed.length);
    res.end(compressed);
  });
}

export function compressionMiddleware() {
  return (req, res, next) => {
    if (!shouldCompress(req, res)) return next();

    const origJson = res.json.bind(res);
    res.json = (body) => {
      const payload = JSON.stringify(body);
      if (Buffer.byteLength(payload) < THRESHOLD) return origJson(body);
      gzipBody(res, Buffer.from(payload), 'application/json; charset=utf-8');
    };

    const origSend = res.send.bind(res);
    res.send = (body) => {
      if (typeof body !== 'string' && !Buffer.isBuffer(body)) return origSend(body);
      const buf = Buffer.isBuffer(body) ? body : Buffer.from(body);
      if (buf.length < THRESHOLD) return origSend(body);
      const type = res.getHeader('Content-Type') || 'text/plain; charset=utf-8';
      gzipBody(res, buf, type);
    };

    next();
  };
}

export function sendJsonFile(res, data, maxAge = 120) {
  const payload = JSON.stringify(data);
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  if (Buffer.byteLength(payload) >= THRESHOLD && /\bgzip\b/i.test(res.req?.headers?.['accept-encoding'] || '')) {
    gzipBody(res, Buffer.from(payload), 'application/json; charset=utf-8');
    return;
  }
  res.type('json').send(payload);
}
