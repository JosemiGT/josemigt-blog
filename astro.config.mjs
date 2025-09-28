import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://josemigt.dev",
  markdown: {
    shikiConfig: {
      theme: "nord"
    }
  }
});