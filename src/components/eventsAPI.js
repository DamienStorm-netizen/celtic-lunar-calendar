import { api } from "../utils/api.js";
import { loadCustomEvents } from "../utils/localStorage.js";
import { authenticatedFetch, isAuthenticated } from "./auth.js";

// Merge and de-duplicate events from backend & local by (date|title|name) key.
// Prefer the LOCAL version when both exist so we keep client-assigned IDs.
function mergeEventsPreferLocal(localList = [], backendList = []) {
  const map = new Map();

  // Seed with backend copy first
  backendList.forEach(evt => {
    if (!evt) return;
    const title = evt.title ?? evt.name ?? "";
    const key = `${evt.date}|${title}`;
    map.set(key, { ...evt });
  });

  // Overlay with local; keep whichever has an id, and prefer local fields
  localList.forEach(evt => {
    if (!evt) return;
    const title = evt.title ?? evt.name ?? "";
    const key = `${evt.date}|${title}`;
    const prev = map.get(key) || {};
    map.set(key, { ...prev, ...evt, id: evt.id || prev.id });
  });

  // Ensure every event has a stable id for UI lookups
  return Array.from(map.values()).map(e => {
    if (e && e.id) return e;
    const title = e.title ?? e.name ?? "";
    return { ...e, id: `${e.date}|${title}` };
  });
}

// Fetch all custom events (authenticated backend first, fallback to localStorage).
// We also explicitly disable caching to avoid stale results on CF Pages.
export async function fetchCustomEvents() {
  let backend = [];

  // Try authenticated endpoint first if user is logged in
  if (isAuthenticated()) {
    try {
      const AUTH_BASE_URL = 'https://lunar-almanac-auth.west-coast-tantra-institute-account.workers.dev'; // Update with your worker URL
      const response = await authenticatedFetch(`${AUTH_BASE_URL}/api/custom-events`);
      if (response.ok) {
        backend = await response.json();
      } else {
        throw new Error(`Authenticated fetch failed: ${response.status}`);
      }
    } catch (error) {
      console.warn("Authenticated custom events fetch failed, trying legacy API:", error);

      // Fallback to legacy Python backend
      try {
        backend = await api.customEvents(); // includes cache-busting "t" param
      } catch (legacyError) {
        console.warn("Legacy backend /api/custom-events also failed:", legacyError);
      }
    }
  } else {
    // Not authenticated, try legacy backend only
    try {
      backend = await api.customEvents(); // includes cache-busting "t" param
    } catch (error) {
      console.warn("Backend /api/custom-events failed, will fall back to localStorage:", error);
    }
  }

  let local = [];
  try {
    local = Array.isArray(loadCustomEvents?.()) ? loadCustomEvents() : [];
  } catch (e) {
    // ignore local read issues
  }

  const merged = mergeEventsPreferLocal(local, backend);
  // Debug breadcrumb: surface counts in console (and window) so we can compare prod vs dev.
  try {
    const info = {
      total: merged.length,
      backend: backend.length,
      local: local.length,
      authenticated: isAuthenticated()
    };
    console.info(`📅 Custom events loaded: ${info.total} (backend ${info.backend} + local ${info.local}) [auth: ${info.authenticated}]`);
    if (typeof window !== "undefined") {
      window.__CUSTOM_EVENT_COUNTS__ = info;
    }
  } catch {}
  return merged;
}

// Delete a custom event (authenticated endpoint first, fallback to legacy).
export async function deleteCustomEvent(idOrKey) {
  // Try authenticated endpoint first if user is logged in
  if (isAuthenticated()) {
    try {
      const AUTH_BASE_URL = 'https://lunar-almanac-auth.west-coast-tantra-institute-account.workers.dev'; // Update with your worker URL
      const response = await authenticatedFetch(`${AUTH_BASE_URL}/api/custom-events/${encodeURIComponent(idOrKey)}`, {
        method: "DELETE"
      });
      if (response.ok) {
        console.log(`Deleted event ${idOrKey} (authenticated)`);
        return true;
      } else {
        throw new Error(`Authenticated delete failed: ${response.status}`);
      }
    } catch (error) {
      console.warn("Authenticated delete failed, trying legacy API:", error);
    }
  }

  // Fallback to legacy Python backend
  try {
    const response = await fetch(`/api/custom-events/${encodeURIComponent(idOrKey)}`, {
      method: "DELETE",
      cache: "no-store",
      headers: { "Cache-Control": "no-store" }
    });
    if (!response.ok) throw new Error("Failed to delete event");
    console.log(`Deleted event ${idOrKey} (legacy)`);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
}

export async function updateCustomEvent(idOrKey, updatedData) {
  // Try authenticated endpoint first if user is logged in
  if (isAuthenticated()) {
    try {
      const AUTH_BASE_URL = 'https://lunar-almanac-auth.west-coast-tantra-institute-account.workers.dev'; // Update with your worker URL
      const response = await authenticatedFetch(`${AUTH_BASE_URL}/api/custom-events/${encodeURIComponent(idOrKey)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log(`Updated event ${idOrKey} (authenticated)`);
        return true;
      } else {
        throw new Error(`Authenticated update failed: ${response.status}`);
      }
    } catch (error) {
      console.warn("Authenticated update failed, trying legacy API:", error);
    }
  }

  // Fallback to legacy Python backend
  try {
    const response = await fetch(`/api/custom-events/${encodeURIComponent(idOrKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      cache: "no-store",
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update event");
    console.log(`Updated event ${idOrKey} (legacy)`);
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    return false;
  }
}

// Create a new custom event (authenticated endpoint first, fallback to legacy).
export async function createCustomEvent(eventData) {
  // Try authenticated endpoint first if user is logged in
  if (isAuthenticated()) {
    try {
      const AUTH_BASE_URL = 'https://lunar-almanac-auth.west-coast-tantra-institute-account.workers.dev'; // Update with your worker URL
      const response = await authenticatedFetch(`${AUTH_BASE_URL}/api/custom-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(`Created event (authenticated):`, result);
        return result;
      } else {
        throw new Error(`Authenticated create failed: ${response.status}`);
      }
    } catch (error) {
      console.warn("Authenticated create failed, trying legacy API:", error);
    }
  }

  // Fallback to legacy Python backend
  try {
    const response = await fetch("/api/custom-events", {
      cache: 'no-store',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) throw new Error("Failed to create event");
    const result = await response.json();
    console.log(`Created event (legacy):`, result);
    return result;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}