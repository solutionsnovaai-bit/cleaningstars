import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Hashed JS/CSS go to /static so they can be cached forever; /assets holds the site imagery.
  build: { assetsDir: 'static' }
});
