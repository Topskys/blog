import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.next', 'build', '*.md', './docs/.vitepress/cache/**']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended as any,
  pluginReact.configs.flat.recommended,
  pluginVue.configs['flat/essential'],
  eslintPluginPrettier,
  eslintConfigPrettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    settings: {
      react: {
        pragma: 'React',
        version: 'detect', // Automatically detect the React version you are using
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/multi-word-component-names': 'warn',
      'prettier/prettier': [
        'error',
        {
          // 指定自定义 Prettier 命令及参数或在lint-staged 中配置，保证每次提交的代码都经过Prettier覆盖式格式化
          command: "prettier --config .prettierrc '.' --write",
        },
      ],
    },
  },
]) as any;
