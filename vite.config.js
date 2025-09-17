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
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        // All frontend calls should go to /api/... in dev. We strip the /api
        // prefix and forward to the FastAPI server at API_URL.
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },

        // Zodiac endpoints proxy for insights modal functionality
        '/zodiac': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },

        // Festivals endpoints proxy
        '/festivals': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },

        // Dynamic moon phases endpoints proxy
        '/dynamic-moon-phases': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },

        // Back-compat: legacy static JSON filename → real API endpoint.
        // If anything still requests /calendar_data.json in dev,
        // forward it to the backend's /calendar-data route.
        '/calendar_data.json': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: () => '/calendar-data',
        },
      },
    },
    plugins: [
      VitePWA({
        devOptions: { enabled: false },
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
            { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { src: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
          ],
        },
      }),
    ],
  };
});