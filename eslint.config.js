import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // change to 'module' if using import/export
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      js,
      prettier,
    },

    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '.github/**',
      '.vscode/**',
    ],

    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // Disable ESLint rules that conflict with Prettier
      ...prettierConfig.rules,

      // Run Prettier as an ESLint rule
      'prettier/prettier': 'error',

      // Common Node.js rules
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
    },
  },
]);
