import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "providers": path.resolve(__dirname, "./src/providers"),
      "api": path.resolve(__dirname, "./src/api"),
      "assets": path.resolve(__dirname, "./src/assets"),
      "helpers": path.resolve(__dirname, "./src/helpers"),
      "routes": path.resolve(__dirname, "./src/routes"),
      "theme": path.resolve(__dirname, "./src/theme"),
      "store": path.resolve(__dirname, "./src/store"),
      "layouts": path.resolve(__dirname, "./src/layouts"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "components": path.resolve(__dirname, "./src/components"),
      "App": path.resolve(__dirname, "./src/App"),
    }
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})