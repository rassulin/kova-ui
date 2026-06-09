import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow unused `h` and `Fragment` — legacy Preact JSX pragma imports
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^(_|h$|Fragment$)' }],

      // Style
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
    settings: {
      // Make jsx-a11y work with Preact
      react: { version: '18' },
    },
  },
  {
    // Relax rules in stories
    files: ['src/**/*.stories.tsx', 'src/stories/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'storybook-static/**'],
  },
  prettier,
);
