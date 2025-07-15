import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'; // 🧪 Add this line


export default defineConfig({
  root: '.',
  build: {
    outDir: 'static', // Build directly into FastAPI's /static folder
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/dynamic-moon-phases': 'http://192.168.1.72:8000',
      '/api': 'http://192.168.1.72:8000',
      '/calendar': 'http://192.168.1.72:8000',
      '/zodiac': 'http://192.168.1.72:8000',
      '/festivals': 'http://192.168.1.72:8000'
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: 'The Lunar Almanac',
        short_name: 'LunarAlmanac',
        start_url: './index.html',

        display: 'standalone',
        background_color: '#0f0f1a',
        theme_color: '#bd9fff',
         "icons": [
        {
          "src": "/icons/calendar-icon.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/faq-icon.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/insights-icon.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/logo-icon.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/settings-icon.png",
        "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        }
      ],
      }
    })
  ]
});