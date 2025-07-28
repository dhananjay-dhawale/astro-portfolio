import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),     // 👈 this enables rendering `.tsx` components
    tailwind(),
  ],
});
