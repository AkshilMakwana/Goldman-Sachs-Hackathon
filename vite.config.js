import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only: browser → Vite → Anthropic (avoids CORS during local demos).
      "/anthropic-api": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/anthropic-api/, ""),
      },
    },
  },
})
