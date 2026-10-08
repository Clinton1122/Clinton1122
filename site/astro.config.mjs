// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://www.lumeyenergy.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  // The design system lives beside the site, one level up.
  vite: { server: { fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] } } },
});
