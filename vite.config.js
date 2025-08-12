import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // Dev falls back to localhost:8000; prod builds don’t use the proxy.
  const API_URL = env.VITE_API_BASE || 'http://localhost:8000';

  return {
    base: '/',
    root: '.',
    build: {
      outDir: 'static',
      emptyOutDir: true,
    },
    // Dev-only proxy so your frontend can call the backend without CORS pain.
    server: {
      proxy: {
        '/api':           { target: API_URL, changeOrigin: true },
        '/calendar':      { target: API_URL, changeOrigin: true },
        '/lunar-phases':  { target: API_URL, changeOrigin: true },
        '/festivals':     { target: API_URL, changeOrigin: true },
        '/notifications': { target: API_URL, changeOrigin: true },
        '/celtic-today':  { target: API_URL, changeOrigin: true },
        '/zodiac':        { target: API_URL, changeOrigin: true },

        // legacy JSON filename → real API endpoint
        '/calendar_data.json': {
          target: API_URL,
          changeOrigin: true,
          rewrite: () => '/api/calendar-data',
        },
      },
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
        manifest: {
          name: 'The Lunar Almanac',
          short_name: 'LunarAlmanac',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#0f0f1a',
          theme_color: '#bd9fff',
          icons: [
            { src: '/assets/icons/calendar-icon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/assets/icons/faq-icon.png',      sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/assets/icons/insights-icon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/assets/icons/logo-icon.png',     sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/assets/icons/settings-icon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          ],
        },
      }),
    ],
  };
});