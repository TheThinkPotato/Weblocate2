import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: process.env.VITE_NODE_ENV === "dev" ?  "/" : "/Weblocate2/" ,
  define: {
    "process.env": {}, // Ensure no conflicts with Node.js environment variables
  },
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
      "/api/dns.google": {
        target: "https://dns.google",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dns.google/, ""),
      },
    },
  },
});
