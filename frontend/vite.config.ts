import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://190.114.255.125:8001",
      "/files": "http://190.114.255.125:8001"
    }
  }
})
