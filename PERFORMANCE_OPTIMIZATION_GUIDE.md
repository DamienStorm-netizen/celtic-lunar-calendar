# Celtic Calendar App - Performance Optimization Guide

## 📊 Current Performance Analysis

### Bundle Size Breakdown:
- **Total Assets**: 13MB (105 PNG files)
- **JavaScript**: ~436KB (5,719 lines)
- **External Dependencies**: 3 CDN libraries
- **CSS**: ~160KB (including utility classes we added)

## 🖼️ Image Optimization Opportunities

### Priority 1: Largest Images (Critical Path)
These images are loaded immediately and impact initial page load:

1. **Month Background Images** (270-283KB each):
   - `maia-pale-bg.png` - 283KB
   - `maia-bg.png` - 270KB  
   - `nivis-pale-bg.png` - 266KB
   - `nivis-bg.png` - 262KB

2. **Zodiac Images** (196-202KB each, 13 total = ~2.6MB):
   - All zodiac sign PNGs are very large
   - Only loaded when user opens zodiac modals

3. **Decorative Images**:
   - `er-logo.png` - 271KB
   - `blue-gradient-bg.png` - 269KB

### Recommended Optimizations:

#### A) Convert to WebP Format
```bash
# Reduce file sizes by 60-80% with WebP
# Example commands (run in assets directory):
cwebp maia-pale-bg.png -q 85 -o maia-pale-bg.webp
cwebp nivis-pale-bg.png -q 85 -o nivis-pale-bg.webp
```

#### B) Implement Progressive Loading
```css
/* Add to CSS for WebP support with fallbacks */
.month-bg {
  background-image: url('path/to/image.webp');
  background-image: url('path/to/image.png'); /* Fallback */
}

/* Use CSS image-set for responsive images */
.zodiac-image {
  background-image: image-set(
    url('zodiac-small.webp') 1x,
    url('zodiac-large.webp') 2x
  );
}
```

#### C) Lazy Loading Implementation
Add intersection observer for images that aren't immediately visible:

```javascript
// Add to new file: src/utils/lazyLoader.js
export function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}
```

## 🚀 JavaScript Bundle Optimization

### Current Status: ✅ Already Well Optimized
- Pure vanilla JS (no heavy frameworks)
- Modular architecture with clean imports
- Minimal external dependencies

### Potential Improvements:

#### A) Dynamic Imports for Route Components
```javascript
// In router.js - load components only when needed
const routes = {
  home: () => import('./components/home.js'),
  calendar: () => import('./components/calendar.js'),
  insights: () => import('./components/insights.js'),
  // ...
};

async function navigateTo(hash) {
  const routeKey = hash.replace('#', '');
  const componentModule = await routes[routeKey]();
  // Use componentModule...
}
```

#### B) External Library Optimization
Current CDN libraries (consider self-hosting for better cache control):
- Flatpickr: ~47KB minified
- SweetAlert2: ~159KB minified  
- Consider replacing with lighter alternatives if needed

## 🔄 API Call Optimization

### Current Patterns Analysis:
- Multiple API calls on home page load
- Some redundant data fetching across components
- Good fallback strategies (API → localStorage)

### Optimization Opportunities:

#### A) Data Caching Strategy
```javascript
// Add to src/utils/dataCache.js
class DataCache {
  constructor(ttl = 300000) { // 5 minutes default TTL
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  invalidate(key) {
    this.cache.delete(key);
  }
}

export const apiCache = new DataCache();
```

#### B) Batch API Requests
```javascript
// Instead of multiple separate API calls:
// fetchCelticDate(), fetchCelticZodiac(), fetchMoonPhase()

// Use single combined endpoint:
async function fetchHomeData() {
  return await api.homeData(); // Returns all home page data at once
}
```

## 📱 PWA Performance Optimizations

### Service Worker Enhancements:
```javascript
// Add to service worker for aggressive caching
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images-v1').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

## 🎯 Implementation Priority

### Phase 1 (Immediate Impact - 60% size reduction):
1. Convert top 10 largest images to WebP
2. Implement lazy loading for zodiac images  
3. Add image compression for month backgrounds

### Phase 2 (Code Splitting):
1. Implement dynamic imports for route components
2. Add API response caching
3. Optimize external library loading

### Phase 3 (Advanced):
1. Implement service worker image caching
2. Add resource hints (preload, prefetch)
3. Consider image sprites for small icons

## 📈 Expected Performance Gains

After implementing these optimizations:
- **Initial page load**: 60-70% faster (reduced from ~13MB to ~4MB)
- **Subsequent navigation**: 40-50% faster (cached components)
- **Lighthouse Score**: Likely improvement from current to 90+ 
- **Mobile performance**: Significant improvement on slower connections

## 🔧 Tools for Measurement

Use these tools to track optimization progress:
1. Chrome DevTools Network tab
2. Lighthouse audits
3. WebPageTest.org
4. Vite bundle analyzer: `npm run build -- --analyze`