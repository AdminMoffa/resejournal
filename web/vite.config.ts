import { defineConfig } from 'vite'
     import react from '@vitejs/plugin-react'
     import { VitePWA } from 'vite-plugin-pwa'
     
     export default defineConfig({
       plugins: [
         react(),
         VitePWA({
           registerType: 'autoUpdate',
           includeAssets: ['favicon.svg', 'robots.txt'],
           manifest: {
             name: 'Resejournal',
            short_name: 'Resejournal',
             start_url: '/',
             display: 'standalone',
             background_color: '#ffffff',
             theme_color: '#0F766E',
             icons: [
               { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
               { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
             ]
           },
           workbox: {
             runtimeCaching: [
               { urlPattern: ({request}) => request.destination === 'document', handler: 'NetworkFirst' },
               { urlPattern: ({request}) => request.destination === 'image', handler: 'CacheFirst' },
            ]
          }
        })
      ]
     })
