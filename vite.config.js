import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// REPLACE with your deployed Vercel URL:
const VERCEL_BACKEND = "https://portfolio-cadingilan.vercel.app/"

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://portfolio-cadingilan.vercel.app",
        changeOrigin: true,
      }
    }
  }
});
