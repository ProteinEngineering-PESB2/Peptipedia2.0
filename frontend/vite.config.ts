import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://66.94.118.108:8001",
      "/files": "http://66.94.118.108:8001"
    }
  }
})
