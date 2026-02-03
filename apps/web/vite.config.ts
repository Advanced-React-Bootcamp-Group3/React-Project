import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    TanStackRouterVite(),
  ],
  resolve: {
    preserveSymlinks: false,
  },
  css: {
    postcss: "../postcss.config.cjs",
  },
  server: {
    port: 3000,
    proxy: {
      "/admin": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
