import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todoapp/', // Make sure this is correct for GitHub Pages subpath
  plugins: [react()],
});









