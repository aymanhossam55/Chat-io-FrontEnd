import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_SOCKET_URL || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
