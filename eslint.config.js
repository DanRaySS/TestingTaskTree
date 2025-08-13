// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['warn', 2],
      "@stylistic/indent-binary-ops": ["warn", 2],
      '@stylistic/curly-newline': ["warn", "always"],
      '@stylistic/function-call-spacing': ["warn", "never"],
      '@stylistic/generator-star-spacing': ["warn", { "before": false, "after": true }],
      '@stylistic/implicit-arrow-linebreak': ["warn", "beside"],
      '@stylistic/jsx-closing-bracket-location': "warn",
      '@stylistic/jsx-closing-tag-location': "warn",
      '@stylistic/jsx-curly-newline': "warn",
      '@stylistic/jsx-curly-spacing': ["warn", { "when": "never" }],
      '@stylistic/jsx-equals-spacing': ["warn", "never"],
      '@stylistic/jsx-indent-props': ["warn", 2],
      '@stylistic/jsx-max-props-per-line': "warn",
      '@stylistic/jsx-one-expression-per-line': "warn",
      '@stylistic/jsx-pascal-case': "error",
      '@stylistic/jsx-props-no-multi-spaces': "warn",
      '@stylistic/jsx-quotes': ["warn", "prefer-single"],
      '@stylistic/jsx-self-closing-comp': "warn",
      '@stylistic/jsx-sort-props': ["warn", { "shorthandFirst": true, "callbacksLast": true, "multiline": "last" }],
      '@stylistic/jsx-tag-spacing': ["error", { "beforeSelfClosing": "always" }],
      '@stylistic/jsx-wrap-multilines': ["warn", 
        { return: "parens-new-line", assignment: "parens-new-line", arrow: "parens-new-line", condition: "parens-new-line", 
          logical: "parens-new-line", prop: "parens-new-line", propertyValue: "parens" }],
      '@stylistic/key-spacing': ["warn", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
      '@stylistic/keyword-spacing': ["warn", { "before": true, "after": true }],
      '@stylistic/lines-between-class-members': ["warn", "always"],
      '@stylistic/max-len': ["error", { "code": 150 }],
      '@stylistic/max-statements-per-line': ["warn", { "max": 1 }],
      '@stylistic/member-delimiter-style': "warn",
      '@stylistic/multiline-ternary': ["warn", "always-multiline"],
      '@stylistic/new-parens': "warn",
      '@stylistic/no-confusing-arrow': "warn",
      '@stylistic/no-extra-parens': "warn",
      '@stylistic/no-extra-semi': "warn",
      '@stylistic/no-floating-decimal': "warn",
      '@stylistic/no-mixed-spaces-and-tabs': "warn",
      '@stylistic/no-multi-spaces': "warn",
      '@stylistic/no-multiple-empty-lines': ["warn", { "max": 2 }],
      '@stylistic/no-trailing-spaces': "warn",
      '@stylistic/quotes': ["warn", "single"],
      '@stylistic/rest-spread-spacing': ["warn", "never"],
      '@stylistic/semi': "warn",
      '@stylistic/semi-spacing': "warn",
      '@stylistic/semi-style': ["warn", "last"],
      '@stylistic/space-before-blocks': "warn",
      '@stylistic/space-before-function-paren': ["warn", "never"],
      '@stylistic/space-in-parens': ["warn", "never"],
      '@stylistic/wrap-regex': "warn",
      '@stylistic/yield-star-spacing': ["warn", "after"],
    }
  },
], storybook.configs["flat/recommended"]);
