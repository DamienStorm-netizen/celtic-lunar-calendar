/**
 * API Response Caching Utility
 * Reduces redundant API calls and improves performance
 */

class ApiCache {
  constructor(defaultTtl = 300000) { // 5 minutes default TTL
    this.cache = new Map();
    this.defaultTtl = defaultTtl;
  }

  /**
   * Generate cache key from URL and parameters
   * @param {string} url - API endpoint URL
   * @param {Object} params - Request parameters
   * @returns {string} - Cache key
   */
  generateKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = params[key];
        return sorted;
      }, {});
    
    return `${url}:${JSON.stringify(sortedParams)}`;
  }

  /**
   * Store data in cache with TTL
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, data, ttl = this.defaultTtl) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Retrieve data from cache if not expired
   * @param {string} key - Cache key
   * @returns {any|null} - Cached data or null if expired/not found
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Check if data exists and is valid in cache
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Remove specific item from cache
   * @param {string} key - Cache key to remove
   */
  invalidate(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all cached data
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache stats
   */
  getStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;
    let totalSize = 0;

    for (const [key, item] of this.cache.entries()) {
      totalSize += JSON.stringify(item.data).length;
      
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    return {
      totalEntries: this.cache.size,
      validEntries: validCount,
      expiredEntries: expiredCount,
      estimatedSizeKB: Math.round(totalSize / 1024)
    };
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Create global cache instance
export const apiCache = new ApiCache();

/**
 * Enhanced fetch wrapper with caching
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @param {number} cacheTtl - Cache TTL override
 * @returns {Promise} - Cached or fresh API response
 */
export async function cachedFetch(url, options = {}, cacheTtl = null) {
  // Only cache GET requests
  if (options.method && options.method.toLowerCase() !== 'get') {
    return fetch(url, options);
  }

  const cacheKey = apiCache.generateKey(url, options.params);
  
  // Try to get from cache first
  const cachedData = apiCache.get(cacheKey);
  if (cachedData) {
    console.log(`📦 Cache HIT for ${url}`);
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(cachedData),
      clone: () => ({ json: () => Promise.resolve(cachedData) })
    });
  }

  console.log(`🌐 Cache MISS for ${url} - fetching...`);
  
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      const data = await response.json();
      
      // Cache successful responses
      apiCache.set(cacheKey, data, cacheTtl);
      
      // Return a response-like object
      return {
        ok: true,
        json: () => Promise.resolve(data),
        clone: () => ({ json: () => Promise.resolve(data) })
      };
    }
    
    return response;
  } catch (error) {
    console.warn(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

/**
 * Cache-aware API helper for Celtic Calendar
 */
export class CachedApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Batch multiple API calls and cache results
   * @param {Array} requests - Array of {url, key, ttl} objects
   * @returns {Promise<Object>} - Object with results keyed by request key
   */
  async batchFetch(requests) {
    const results = {};
    const pendingRequests = [];

    // Check cache for each request
    for (const request of requests) {
      const cacheKey = apiCache.generateKey(request.url);
      const cached = apiCache.get(cacheKey);
      
      if (cached) {
        results[request.key] = cached;
      } else {
        pendingRequests.push(request);
      }
    }

    // Fetch uncached requests
    if (pendingRequests.length > 0) {
      const fetchPromises = pendingRequests.map(async (request) => {
        try {
          const response = await cachedFetch(request.url, {}, request.ttl);
          const data = await response.json();
          results[request.key] = data;
          return { key: request.key, data };
        } catch (error) {
          console.warn(`Batch fetch failed for ${request.url}:`, error);
          results[request.key] = null;
          return { key: request.key, data: null };
        }
      });

      await Promise.all(fetchPromises);
    }

    return results;
  }

  /**
   * Invalidate cache for specific patterns
   * @param {string} pattern - URL pattern to invalidate
   */
  invalidatePattern(pattern) {
    for (const key of apiCache.cache.keys()) {
      if (key.includes(pattern)) {
        apiCache.invalidate(key);
      }
    }
  }
}

/**
 * Schedule periodic cache cleanup
 */
let cleanupInterval;

export function startCacheCleanup(intervalMs = 300000) { // 5 minutes
  if (cleanupInterval) clearInterval(cleanupInterval);
  
  cleanupInterval = setInterval(() => {
    apiCache.cleanup();
    const stats = apiCache.getStats();
    console.log(`🧹 Cache cleanup: ${stats.expiredEntries} expired, ${stats.validEntries} remaining`);
  }, intervalMs);
}

export function stopCacheCleanup() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

// Auto-start cleanup in browser environment
if (typeof window !== 'undefined') {
  startCacheCleanup();
}