import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: 'http://localhost:7014',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
}
);
