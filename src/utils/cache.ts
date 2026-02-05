type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

const globalCache = ((globalThis as typeof globalThis & { __appCache?: Map<string, CacheEntry<unknown>> }).__appCache ??= new Map());

export async function getCached<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const entry = globalCache.get(key) as CacheEntry<T> | undefined;
  if (entry && now - entry.timestamp < ttlMs) {
    return entry.value;
  }

  try {
    const value = await fetcher();
    globalCache.set(key, { value, timestamp: now });
    return value;
  } catch (error) {
    if (entry) {
      return entry.value;
    }
    throw error;
  }
}
