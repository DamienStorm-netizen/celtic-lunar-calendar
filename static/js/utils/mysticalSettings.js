// static/js/utils/mysticalSettings.js

// Retrieve user mystical preferences from localStorage or set defaults
export function getMysticalPrefs() {
    const savedPrefs = localStorage.getItem("mysticalPrefs");
    if (savedPrefs) {
      return JSON.parse(savedPrefs);
    }
    return {
      showMoons: true,
      showEclipses: true,
      showHolidays: true,
      showCustomEvents: true
    };
  }