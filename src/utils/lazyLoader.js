/**
 * Lazy Loading Utility for Celtic Calendar App
 * Implements intersection observer for performance optimization
 */

/**
 * Initialize lazy loading for images with data-src attribute
 * @param {string} selector - CSS selector for images to lazy load
 * @param {Object} options - Intersection observer options
 */
export function initLazyLoading(selector = 'img[data-src]', options = {}) {
  // Default intersection observer options
  const defaultOptions = {
    root: null,
    rootMargin: '50px', // Start loading 50px before image enters viewport
    threshold: 0.1
  };

  const observerOptions = { ...defaultOptions, ...options };

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, loading all images immediately');
    loadAllImages(selector);
    return;
  }

  const images = document.querySelectorAll(selector);
  
  if (images.length === 0) {
    return; // No images to lazy load
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        imageObserver.unobserve(img);
      }
    });
  }, observerOptions);

  images.forEach(img => {
    imageObserver.observe(img);
    // Add loading placeholder if not already present
    if (!img.classList.contains('lazy-loading')) {
      img.classList.add('lazy-loading');
    }
  });

  console.log(`🖼️ Initialized lazy loading for ${images.length} images`);
}

/**
 * Load a single image and handle the transition
 * @param {HTMLImageElement} img - Image element to load
 */
function loadImage(img) {
  const src = img.dataset.src;
  if (!src) return;

  // Create a new image to preload
  const imageLoader = new Image();
  
  imageLoader.onload = function() {
    // Successfully loaded, update the actual image
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.remove('lazy-loading');
    img.classList.add('lazy-loaded');
  };

  imageLoader.onerror = function() {
    // Failed to load, remove from lazy loading and show error state
    img.classList.remove('lazy-loading');
    img.classList.add('lazy-error');
    console.warn('Failed to lazy load image:', src);
  };

  // Start loading
  imageLoader.src = src;
}

/**
 * Fallback for browsers without IntersectionObserver
 * @param {string} selector - CSS selector for images
 */
function loadAllImages(selector) {
  const images = document.querySelectorAll(selector);
  images.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}

/**
 * Lazy load background images on elements with data-bg attribute
 * @param {string} selector - CSS selector for elements with background images
 * @param {Object} options - Intersection observer options
 */
export function initLazyBackgrounds(selector = '[data-bg]', options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observerOptions = { ...defaultOptions, ...options };

  if (!('IntersectionObserver' in window)) {
    loadAllBackgrounds(selector);
    return;
  }

  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    return;
  }

  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const bgUrl = element.dataset.bg;
        
        if (bgUrl) {
          element.style.backgroundImage = `url('${bgUrl}')`;
          element.removeAttribute('data-bg');
          element.classList.add('bg-loaded');
        }
        
        bgObserver.unobserve(element);
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    bgObserver.observe(element);
    element.classList.add('bg-loading');
  });

  console.log(`🎨 Initialized lazy loading for ${elements.length} background images`);
}

/**
 * Fallback for loading all background images immediately
 * @param {string} selector - CSS selector
 */
function loadAllBackgrounds(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    const bgUrl = element.dataset.bg;
    if (bgUrl) {
      element.style.backgroundImage = `url('${bgUrl}')`;
      element.removeAttribute('data-bg');
    }
  });
}

/**
 * Utility function to update existing images to use lazy loading
 * Call this after dynamic content is added to the page
 */
export function updateLazyLoading() {
  initLazyLoading();
  initLazyBackgrounds();
}

/**
 * Preload critical images that will be needed soon
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
  console.log(`🚀 Preloaded ${imageUrls.length} critical images`);
}