import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If you're having issues, you might need to explicitly configure PostCSS here
  css: {
    postcss: './postcss.config.js',
  }
});
