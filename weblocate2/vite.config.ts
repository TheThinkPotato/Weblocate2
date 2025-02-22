import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: process.env.VITE_NODE_ENV === "dev" ?  "/" : "/" ,
  define: {
    "process.env": {}, // Ensure no conflicts with Node.js environment variables
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },  
});
