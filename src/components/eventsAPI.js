import { api } from "../utils/api.js";
import { loadCustomEvents } from "../utils/localStorage.js";

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

// Fetch all custom events (backend first, fallback to localStorage).
// We also explicitly disable caching to avoid stale results on CF Pages.
export async function fetchCustomEvents() {
  let backend = [];
  try {
    backend = await api.customEvents(); // includes cache-busting "t" param
  } catch (error) {
    console.warn("Backend /api/custom-events failed, will fall back to localStorage:", error);
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
    const info = { total: merged.length, backend: backend.length, local: local.length };
    console.info(`📅 Custom events loaded: ${info.total} (backend ${info.backend} + local ${info.local})`);
    if (typeof window !== "undefined") {
      window.__CUSTOM_EVENT_COUNTS__ = info;
    }
  } catch {}
  return merged;
}

// Delete a custom event (best-effort; backend API remains authoritative).
export async function deleteCustomEvent(idOrKey) {
  try {
    const response = await fetch(`/api/custom-events/${encodeURIComponent(idOrKey)}`, {
      method: "DELETE",
      cache: "no-store",
      headers: { "Cache-Control": "no-store" }
    });
    if (!response.ok) throw new Error("Failed to delete event");
    console.log(`Deleted event ${idOrKey}`);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

export async function updateCustomEvent(idOrKey, updatedData) {
  try {
    const response = await fetch(`/api/custom-events/${encodeURIComponent(idOrKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      cache: "no-store",
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update event");
    console.log(`Updated event ${idOrKey}`);
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
  }
}