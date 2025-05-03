export function initSwipe(element, { onSwipeLeft, onSwipeRight, threshold = 30 }) {
    let touchStartX = 0;
    let touchEndX = 0;
  
    if (!element) {
      console.warn("Swipe handler: no element provided.");
      return;
    }
  
    element.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    element.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance < 0) {
          onSwipeLeft?.(); // Optional chaining to safely call
        } else {
          onSwipeRight?.();
        }
      }
    }
  }

// --- PATCH: updateCarousel slideWidth calculation ---
// In your calendar.js, find updateCarousel and change:
// const slideWidth = carousel.offsetWidth; // safer and always defined
// to:
// const slideWidth = slides[0].clientWidth; // width of a single slide