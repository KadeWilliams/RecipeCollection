import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  const apiTarget = isProd
    ? 'https://recipecollectionapi-production.up.railway.app/'
    : 'http://localhost:7014'
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        //'/api': {
        //  target: 'https://localhost:7014/api/recipes',
        //  changeOrigin: true,
        //  rewrite: (path) => path.replace(/^\/api/,'')
        //}
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
}
);
