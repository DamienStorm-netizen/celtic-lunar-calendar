// components/viewLoader.js

export function loadPage(view, init) {
  document.getElementById('app').innerHTML = '';
  view();

  if (typeof init === "function") {
      requestAnimationFrame(() => init());
  } else {
      console.warn("🌀 No valid init function provided for this route.");
  }
}