// static/js/utils/mysticalSettings.js

// Retrieve user mystical preferences from localStorage or set defaults
export function getMysticalPrefs() {
  const savedPrefs = localStorage.getItem("mysticalPrefs");
  if (savedPrefs) {
    return JSON.parse(savedPrefs);
  }
  // Sensible defaults so things actually show up
  return {
    showHolidays: true,
    showCustomEvents: true,
    showMoons: true,
    showEclipses: true,
    showPastEvents: false,
    mysticalSuggestions: true
  };
}