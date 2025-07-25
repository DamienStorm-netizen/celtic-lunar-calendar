const CACHE_NAME = 'lunar-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/styles.css',
  '/static/css/moonveil-theme.css',
  '/static/js/script.js',
  '/static/assets/icons/logo-icon.png',
  '/static/assets/calendar_data.json',
  '/static/assets/icons/faq-icon.png',
  '/static/assets/icons/full-moon.png',
  '/static/assets/icons/insights-icon.png',
  '/static/assets/icons/settings-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});