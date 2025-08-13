import type { Config } from 'jest';
import path from 'path';
import { createDefaultPreset } from 'ts-jest';
import { fileURLToPath } from 'url';

const tsJestTransformCfg = createDefaultPreset().transform;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Config = {
  rootDir: path.resolve(__dirname, '..', '..', '..'),
  testEnvironment: 'jsdom',
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(test).[tj]s?(x)'],
};

export default config;
