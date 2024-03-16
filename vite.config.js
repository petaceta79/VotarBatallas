import { defineConfig } from 'vite';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')(path.resolve(__dirname, './tailwind.config.js')),
        require('autoprefixer'),
      ],
    },
  },
});
