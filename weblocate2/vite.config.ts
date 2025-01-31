import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    
  },
  server: {
    proxy: {
      "/api/abuseipdb": {
        target: "https://api.abuseipdb.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/abuseipdb/, ""),
      },
      "/api/geoip": {
        target: "https://api.ipgeolocation.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geoip/, ""),
      },
    },
  },
});
