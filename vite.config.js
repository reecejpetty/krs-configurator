import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "KRS Online Configurator",
        "short_name": "Configurator",
        "start_url": "/krs-configurator/",
        "display": "standalone",
        "background_color": "#F7F8FA",
        "theme_color": "#1A3F6F",
        "icons": [
          {
            "src": "mobile_logo_192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "mobile_logo.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ],
  base: "/krs-configurator/"
})
