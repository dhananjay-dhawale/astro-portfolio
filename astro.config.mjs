import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://dhananjay-dhawale.github.io',
  base: '/astro-portfolio',
  integrations: [
    react(),     // 👈 this enables rendering `.tsx` components
    tailwind(),
  ],
});
