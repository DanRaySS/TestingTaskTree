import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  'stories': [
    '../../../**/*.mdx',
    '../../../**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  'addons': [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  'framework': {
    'name': '@storybook/react-vite',
    'options': {}
  },
  viteFinal: async(config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        add: path.resolve(__dirname, '../../../app'),
        pages: path.resolve(__dirname, '../../../pages'),
        widgets: path.resolve(__dirname, '../../../widgets'),
        features: path.resolve(__dirname, '../../../features'),
        entities: path.resolve(__dirname, '../../../entities'),
        shared: path.resolve(__dirname, '../../../shared'),
        helpers: path.resolve(__dirname, '../../../helpers'),
      },
    };
    return config;
  },
  'staticDirs': ['../../../../public'],
  'core': {
    disableTelemetry: true,
    enableCrashReports: false,
  },
};
export default config;