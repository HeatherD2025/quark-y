import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5555', // adjust this to your backend URL and port
    },
  },
  optimizeDeps: {
    include: ['jwt-decode'],
  },
});