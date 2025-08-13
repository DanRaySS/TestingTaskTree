/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      App: '/src/App.tsx',
      app: '/src/app',
      assets: '/src/assets',
      entities: '/src/entities',
      helpers: '/src/helpers',
      pages: '/src/pages',
      processes: '/src/processes',
      shared: '/src/shared',
      widgets: '/src/widgets',
      features: '/src/features'
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.resolve(dirname, 'src', 'shared', 'config', 'storybook')
        })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['./src/shared/config/vitest.setup.ts']
      }
    }]
  }
});