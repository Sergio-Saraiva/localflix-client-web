import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/subtitles': {
        target: 'http://192.168.1.195:3000', // Fiber server
        changeOrigin: true,
      },
    },
    host: '0.0.0.0', // Listen to all network interfaces
    port: 4001,      // Optional: Change the port if needed
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
