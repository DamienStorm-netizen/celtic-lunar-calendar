// 🕰️ Set a minimum preloader display time (e.g., 2 seconds)
const MIN_DISPLAY_TIME = 2000;
const startTime = Date.now();

window.addEventListener("load", () => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("fade-out");

      // Wait for the fade-out transition to finish before removing
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800); // Match this to your CSS transition duration
    }
  }, remaining);
});