import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    allowedHosts: [
      "8665d7b973ff.ngrok-free.app", 
    ],
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': 'frame-ancestors https://discord.com https://*.discord.com *'
    }
  }
})
