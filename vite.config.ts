/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: '/TestingTaskTree/',
  resolve: {
    alias: {
      App: path.resolve(dirname, 'src', 'App.tsx'),
      app: path.resolve(dirname, 'src', 'app'),
      assets: path.resolve(dirname, 'src', 'assets'),
      entities: path.resolve(dirname, 'src', 'entities'),
      helpers: path.resolve(dirname, 'src', 'helpers'),
      pages: path.resolve(dirname, 'src', 'pages'),
      processes: path.resolve(dirname, 'src', 'processes'),
      shared: path.resolve(dirname, 'src', 'shared'),
      widgets: path.resolve(dirname, 'src', 'widgets'),
      features: path.resolve(dirname, 'src', 'features')
    }
  },
  test: {
    projects: [
      // {
      //   extends: true,
      //   plugins: [
      //     storybookTest({
      //       configDir: path.resolve(dirname, 'src', 'shared', 'config', 'storybook')
      //     })],
      //   test: {
      //     alias: {
      //       App: path.resolve(dirname, 'src', 'App.tsx'),
      //       app: path.resolve(dirname, 'src', 'app'),
      //       assets: path.resolve(dirname, 'src', 'assets'),
      //       entities: path.resolve(dirname, 'src', 'entities'),
      //       helpers: path.resolve(dirname, 'src', 'helpers'),
      //       pages: path.resolve(dirname, 'src', 'pages'),
      //       processes: path.resolve(dirname, 'src', 'processes'),
      //       shared: path.resolve(dirname, 'src', 'shared'),
      //       widgets: path.resolve(dirname, 'src', 'widgets'),
      //       features: path.resolve(dirname, 'src', 'features')
      //     },
      //     name: 'storybook',
      //     browser: {
      //       enabled: true,
      //       headless: true,
      //       provider: 'playwright',
      //       instances: [{
      //         browser: 'chromium'
      //       }]
      //     },
      //     setupFiles: [path.resolve(dirname, 'src', 'shared', 'config', 'vitest.setup.ts')]
      //   }
      // },
      {
        test: {
          alias: {
            App: path.resolve(dirname, 'src', 'App.tsx'),
            app: path.resolve(dirname, 'src', 'app'),
            assets: path.resolve(dirname, 'src', 'assets'),
            entities: path.resolve(dirname, 'src', 'entities'),
            helpers: path.resolve(dirname, 'src', 'helpers'),
            pages: path.resolve(dirname, 'src', 'pages'),
            processes: path.resolve(dirname, 'src', 'processes'),
            shared: path.resolve(dirname, 'src', 'shared'),
            widgets: path.resolve(dirname, 'src', 'widgets'),
            features: path.resolve(dirname, 'src', 'features')
          },
          name: 'tests-unit',
          include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
          environment: 'jsdom',
        }
      },
    ]
  }
});