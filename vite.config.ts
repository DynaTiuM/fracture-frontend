import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/fracture-frontend/",
  plugins: [
    react(),
  ],
  server: {
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': 'frame-ancestors https://discord.com https://*.discord.com *'
    }
  }
})
