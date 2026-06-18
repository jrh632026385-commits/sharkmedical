let storeClient = null;

export function isKvEnabled() {
  return !!(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  );
}

async function getStoreClient() {
  if (!isKvEnabled()) return null;
  if (storeClient) return storeClient;
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { Redis } = await import('@upstash/redis');
    storeClient = Redis.fromEnv();
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
