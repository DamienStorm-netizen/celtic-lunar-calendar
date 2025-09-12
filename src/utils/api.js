/**
 * @fileoverview API Client for Celtic Calendar App
 * Handles all HTTP communication with the backend Celtic Calendar API
 * Supports both development (Vite proxy) and production (Render.com) environments
 */

/**
 * Raw API base URL from environment variables, with trailing slash removed
 * @type {string}
 */
const RAW_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

/**
 * Detect if we're in production on Cloudflare Pages (or similar static host)
 * @type {boolean}
 */
const isStaticProduction = !import.meta.env.DEV && !RAW_BASE && typeof window !== "undefined" && 
  (window.location.hostname.includes('.pages.dev') || window.location.hostname.includes('playgroundofthesenses.com'));

/**
 * Final API base URL with production fallback for Cloudflare Pages
 * @type {string}
 */
const API_BASE = RAW_BASE || 
  (isStaticProduction ? "https://lunar-almanac-backend.onrender.com" : 
  (typeof window !== "undefined" ? window.location.origin : ""));

// Development warning for proxy configuration
if (!RAW_BASE && import.meta.env.DEV) {
  console.warn('[LunarAlmanac] VITE_API_BASE is empty; using same-origin with Vite proxy.');
}

// Production runtime logging
if (!import.meta.env.DEV) {
  console.log('[LunarAlmanac] API Base URL:', API_BASE, { 
    envVar: !!RAW_BASE, 
    staticProd: isStaticProduction,
    hostname: typeof window !== "undefined" ? window.location.hostname : 'unknown'
  });
}

/**
 * Normalize request path for different environments
 * In development, keeps "/api/..." for Vite proxy rewriting
 * In production with explicit base URL, strips "/api" segment
 * @param {string} path - API endpoint path
 * @returns {string} Normalized path
 */
function normalizePath(path) {
  return (RAW_BASE && path.startsWith("/api")) ? path.replace(/^\/api/, "") : path;
}

/**
 * Build complete URL with query parameters
 * @param {string} path - API endpoint path
 * @param {Object.<string, any>} [params] - Query parameters to append
 * @returns {string} Complete URL string
 */
function url(path, params) {
  // Build a fully qualified URL against API_BASE
  const u = new URL(normalizePath(path), API_BASE);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, v);
    }
  }
  return u.toString();
}

/**
 * Perform HTTP GET request with automatic JSON parsing
 * @param {string} path - API endpoint path
 * @param {Object.<string, any>} [params] - Query parameters
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} HTTP error with status and status text
 */
async function get(path, params) {
  const res = await fetch(
    url(path, params),
    {
      headers: { Accept: "application/json", "Cache-Control": "no-store" },
      cache: "no-store"
    }
  );
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

/**
 * Celtic Calendar API client interface
 * Provides methods for all backend interactions
 * @namespace
 */
export const api = {
  // Health and system endpoints
  // health: () => get('/api/healthz'),

  /**
   * Get static calendar data including month information and configurations
   * @returns {Promise<Object>} Calendar configuration data
   */
  calendarData: () => get('/api/calendar-data'),

  /**
   * Get current Celtic date information
   * @returns {Promise<Object>} Current Celtic date with lunar calculations
   */
  celticDate: () => get('/api/celtic-date'),

  /**
   * Get dynamic moon phases for a specific date range
   * @param {string} startISO - Start date in ISO format (YYYY-MM-DD)
   * @param {string} endISO - End date in ISO format (YYYY-MM-DD)
   * @returns {Promise<Array>} Array of moon phase data objects
   */
  dynamicMoonPhases: (startISO, endISO) =>
    get('/api/dynamic-moon-phases', { start_date: startISO, end_date: endISO }),

  /**
   * Get Celtic festivals and celebrations data
   * @returns {Promise<Array>} Array of festival objects with dates and descriptions
   */
  festivals: () => get('/api/festivals'),

  /**
   * Get eclipse events data
   * @returns {Promise<Array>} Array of eclipse objects with timing and visibility
   */
  eclipseEvents: () => get('/api/eclipse-events'),

  /**
   * Get national holidays data
   * @returns {Promise<Array>} Array of holiday objects
   */
  nationalHolidays: () => get('/api/national-holidays'),

  /**
   * Get user custom events with cache-busting
   * Cache-busting timestamp prevents stale data from CDN/proxies
   * @returns {Promise<Array>} Array of user-created event objects
   */
  customEvents: () => get('/api/custom-events', { t: Date.now() }),

  /**
   * Create a new custom event
   * @param {Object} evt - Event object to create
   * @param {string} evt.title - Event title/name
   * @param {string} evt.date - Event date in YYYY-MM-DD format
   * @param {string} [evt.notes] - Optional event notes
   * @param {string} [evt.category] - Event category/type
   * @param {boolean} [evt.recurring] - Whether event repeats annually
   * @returns {Promise<Object>} Created event object with assigned ID
   */
  addCustomEvent: (evt) => post('/api/custom-events', evt),
};

/**
 * Perform HTTP POST request with JSON payload
 * @param {string} path - API endpoint path
 * @param {Object} body - Request payload object
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} HTTP error with descriptive message
 */
async function post(path, body) {
  const res = await fetch(url(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API POST failed: ${res.status} ${res.statusText}`);
  return res.json();
}