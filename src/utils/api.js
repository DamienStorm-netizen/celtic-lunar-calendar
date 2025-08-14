const RAW_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
// If RAW_BASE is empty, use the current origin so relative paths work in dev with Vite's proxy
const API_BASE = RAW_BASE || (typeof window !== "undefined" ? window.location.origin : "");
if (!RAW_BASE && import.meta.env.DEV) {
  console.warn('[LunarAlmanac] VITE_API_BASE is empty; using same-origin with Vite proxy.');
}

function url(path, params) {
  // Build a fully qualified URL against API_BASE (or current origin in dev)
  const u = new URL(path, API_BASE);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, v);
    }
  }
  return u.toString();
}

async function get(path, params) {
  const res = await fetch(url(path, params), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  // health
  health: () => get('/api/healthz'),

  // shared data
  calendarData: () => get('/api/calendar-data'),
  celticDate:   () => get('/api/celtic-date'),

  // moon phases
  dynamicMoonPhases: (startISO, endISO) =>
    get('/api/dynamic-moon-phases', { start_date: startISO, end_date: endISO }),

  // domain data
  festivals:        () => get('/api/festivals'),
  eclipseEvents:    () => get('/api/eclipse-events'),
  nationalHolidays: () => get('/api/national-holidays'),

  // custom events
  customEvents:   () => get('/api/custom-events'),
  addCustomEvent: (evt) => post('/api/custom-events', evt),
};

async function post(path, body) {
  const res = await fetch(url(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API POST failed: ${res.status} ${res.statusText}`);
  return res.json();
}