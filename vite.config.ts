import { defineConfig } from 'vite';

console.log('vite.config.ts loaded!');

export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
});