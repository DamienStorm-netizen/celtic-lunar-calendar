import { api } from "../utils/api.js";
import { loadCustomEvents } from "../utils/localStorage.js";

// Merge and de-duplicate events from multiple sources by (date|name) key
function dedupeEvents(...lists) {
  const map = new Map();
  lists.flat().forEach(evt => {
    if (!evt) return;
    const key = `${evt.date}|${evt.name}`; // stable enough for our use-case
    if (!map.has(key)) map.set(key, evt);
  });
  return Array.from(map.values());
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

  const merged = dedupeEvents(backend, local);
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
export async function deleteCustomEvent(date) {
  try {
    const response = await fetch(`/api/custom-events/${date}`, { method: "DELETE", cache: "no-store", headers: { "Cache-Control": "no-store" } });
    if (!response.ok) throw new Error("Failed to delete event");
    console.log(`Deleted event on ${date}`);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

// Update an existing event
export async function updateCustomEvent(date, updatedData) {
  try {
    const response = await fetch(`/api/custom-events/${date}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      cache: "no-store",
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update event");
    console.log(`Updated event on ${date}`);
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
  }
}