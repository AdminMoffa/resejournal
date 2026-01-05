
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Registrerar SW och uppdaterar automatiskt när ny build finns
      registerType: 'autoUpdate',

      // Se till att dessa filer finns i /public
      includeAssets: ['favicon.svg', 'robots.txt'],

      manifest: {
        name: 'Resejournal',
        short_name: 'Resejournal',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0F766E',
        icons: [
          // Lägg gärna till maskable-variant för bättre Android-installation
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },

      // Workbox-konfiguration (generateSW default)
      workbox: {
        // Om du använder client-side routing, fallbacka till index.html
        navigateFallback: '/index.html',

        // Rimliga runtime-caching-regler
        runtimeCaching: [
          // HTML-dokument & navigeringar: prioritera online men fungera offline
          {
            urlPattern: ({ request, sameOrigin, url }) =>
              request.destination === 'document' || (sameOrigin && url.pathname.startsWith('/')),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-pages',
              networkTimeoutSeconds: 3
            }
          },

          // Bilder: snabb upplevelse via cache
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dagar
              }
            }
          },

          // Static assets (JS/CSS): vanlig tumregel är StaleWhileRevalidate
          {
            urlPattern: ({ request }) => ['script', 'style', 'font'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      },

      // Valfritt: aktivera PWA under dev för snabbare iteration
      devOptions: {
        enabled: true
      }
    })
  ],
  // (valfritt) base: '/', om du hostar under subpath sätt base till den
})

