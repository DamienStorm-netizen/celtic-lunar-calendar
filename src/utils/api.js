const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

if (!API_BASE && import.meta.env.DEV) {
  console.warn('[LunarAlmanac] VITE_API_BASE is empty. Set it in .env.development or .env.production.');
}

function url(path, params) {
  const u = new URL(API_BASE + path);
  if (params) for (const [k, v] of Object.entries(params))
    if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, v);
  return u.toString();
}

async function get(path, params) {
  const res = await fetch(url(path, params), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  // health
  health: () => get('/healthz'),

  // shared data
  calendarData: () => get('/api/calendar-data'),
  celticDate:   () => get('/api/celtic-date'),

  // moon phases
  dynamicMoonPhases: (startISO, endISO) =>
    get('/dynamic-moon-phases', { start_date: startISO, end_date: endISO }),

  // domain data
  festivals:        () => get('/festivals'),
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