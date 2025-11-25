import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      'node_modules',
      'test-results',
      'playwright-report',
      'blob-report',
      'playwright/.cache',
      '.env',
      'allure-report',
      'allure-results',
    ],
  },
  {
    files: ['**/*.ts'],
    plugins: { js },
    extends: ['js/recommended', prettierConfig],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    rules: {
      /* Playwright */
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-conditional-in-test': 'off',

      /* Possible Errors */
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-fallthrough': 'error',
      'no-implied-eval': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],

      /* Best Practices */
      'consistent-return': 'error',
      'no-else-return': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',

      /* Stylistic */
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'eol-last': ['error', 'always'],
      indent: ['error', 2],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'max-len': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-infix-ops': 'error',

      /* Debugging */
      'no-restricted-syntax': [
        'warn',
        {
          'selector': 'CallExpression[callee.object.name=\'console\'][callee.property.name=\'log\']',
          'message': 'Unexpected console.log statement.',
        },
      ],
      'no-debugger': ['warn'],
    },
  },
]);
