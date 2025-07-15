// Save custom events to local storage
export function saveCustomEvents(events) {
    localStorage.setItem("customEvents", JSON.stringify(events));
  }
  
  // Load custom events from local storage
  export function loadCustomEvents() {
    const stored = localStorage.getItem("customEvents");
    return stored ? JSON.parse(stored) : [];
  }
  
  // Optional: remove all saved events
  export function clearCustomEvents() {
    localStorage.removeItem("customEvents");
  }