let storeClient = null;

function resolveRedisEnv() {
  const pairs = [
    ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
    ['STORAGE_URL', 'STORAGE_TOKEN'],
    ['STORAGE_REST_URL', 'STORAGE_REST_TOKEN'],
    ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN']
  ];
  for (const [urlKey, tokenKey] of pairs) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) return { url, token };
  }
  return null;
}

export function isKvEnabled() {
  return !!resolveRedisEnv();
}

async function getStoreClient() {
  if (!isKvEnabled()) return null;
  if (storeClient) return storeClient;
  const cfg = resolveRedisEnv();
  if (cfg?.url?.startsWith('http')) {
    const { Redis } = await import('@upstash/redis');
    storeClient = new Redis({ url: cfg.url, token: cfg.token });
    return storeClient;
  }
  const { kv } = await import('@vercel/kv');
  storeClient = {
    get: key => kv.get(key),
    set: (key, value) => kv.set(key, value)
  };
  return storeClient;
}

export async function kvGet(key) {
  const client = await getStoreClient();
  if (!client) return null;
  try {
    return await client.get(key);
  } catch {
    return null;
  }
}

export async function kvSet(key, value) {
  const client = await getStoreClient();
  if (!client) return false;
  await client.set(key, value);
  return true;
}

export function isVercel() {
  return !!process.env.VERCEL;
}

export function canPersistWrites() {
  return !isVercel() || isKvEnabled();
}
