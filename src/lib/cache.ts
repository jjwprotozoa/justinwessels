/**
 * Caching utilities for API responses and computed values
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
  staleWhileRevalidate?: boolean; // Return stale data while revalidating
}

class MemoryCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 5 * 60 * 1000, // 5 minutes default
      maxSize: options.maxSize || 100,
      staleWhileRevalidate: options.staleWhileRevalidate || false,
    };
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired) {
      if (this.options.staleWhileRevalidate) {
        // Return stale data and trigger revalidation
        this.revalidate(key);
        return entry.data;
      } else {
        this.cache.delete(key);
        return null;
      }
    }

    return entry.data;
  }

  set(key: string, data: T, ttl?: number): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.options.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.options.ttl,
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  private async revalidate(key: string): Promise<void> {
    // This would trigger a background revalidation
    // Implementation depends on the specific use case
    console.log(`Revalidating cache for key: ${key}`);
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expired = 0;
    let valid = 0;

    for (const entry of this.cache.values()) {
      if (now - entry.timestamp > entry.ttl) {
        expired++;
      } else {
        valid++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      hitRate: 0, // This would need to be tracked separately
    };
  }
}

// Global cache instances
export const apiCache = new MemoryCache({ ttl: 5 * 60 * 1000, maxSize: 50 });
export const computedCache = new MemoryCache({ ttl: 10 * 60 * 1000, maxSize: 100 });
export const imageCache = new MemoryCache({ ttl: 60 * 60 * 1000, maxSize: 200 }); // 1 hour

// Cache key generators
export function generateCacheKey(prefix: string, ...params: (string | number)[]): string {
  return `${prefix}:${params.join(':')}`;
}

// Cached API call wrapper
export async function cachedApiCall<T>(
  key: string,
  apiCall: () => Promise<T>,
  options?: CacheOptions
): Promise<T> {
  const cache = new MemoryCache<T>(options);
  const cached = cache.get(key);

  if (cached !== null) {
    return cached;
  }

  try {
    const data = await apiCall();
    cache.set(key, data);
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Cache invalidation patterns
export function invalidateCachePattern(pattern: string): void {
  const regex = new RegExp(pattern);
  
  for (const key of apiCache['cache'].keys()) {
    if (regex.test(key)) {
      apiCache.delete(key);
    }
  }
}

// Cache warming
export async function warmCache<T>(
  keys: string[],
  fetcher: (key: string) => Promise<T>,
  options?: CacheOptions
): Promise<void> {
  const cache = new MemoryCache<T>(options);
  
  const promises = keys.map(async (key) => {
    try {
      const data = await fetcher(key);
      cache.set(key, data);
    } catch (error) {
      console.warn(`Failed to warm cache for key ${key}:`, error);
    }
  });

  await Promise.allSettled(promises);
}

// Cache middleware for Next.js API routes
export function withCache<T>(
  handler: (req: any, res: any) => Promise<T>
) {
  return async (req: any, res: any) => {
    const cacheKey = generateCacheKey(
      req.url,
      JSON.stringify(req.query),
      JSON.stringify(req.body)
    );

    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    try {
      const result = await handler(req, res);
      apiCache.set(cacheKey, result);
      res.setHeader('X-Cache', 'MISS');
      return result;
    } catch (error) {
      res.setHeader('X-Cache', 'ERROR');
      throw error;
    }
  };
}

// Cache headers helper
export function getCacheHeaders(ttl: number = 300): Record<string, string> {
  return {
    'Cache-Control': `public, max-age=${ttl}, s-maxage=${ttl}, stale-while-revalidate=86400`,
    'X-Cache-TTL': ttl.toString(),
  };
}

// Cache statistics endpoint
export function getCacheStats() {
  return {
    api: apiCache.getStats(),
    computed: computedCache.getStats(),
    image: imageCache.getStats(),
  };
}

// Cache cleanup (run periodically)
export function cleanupExpiredEntries(): void {
  const caches = [apiCache, computedCache, imageCache];
  
  caches.forEach(cache => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    for (const [key, entry] of cache['cache'].entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => cache.delete(key));
  });
}

// Auto-cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}
