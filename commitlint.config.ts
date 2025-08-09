import { defineConfig } from 'cz-git';

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // 正则匹配格式: [图标][空格][类型][(范围)]: [描述]
      headerPattern: /^(\S+)\s(\w+)(?:\(([\w-]+)\))?:\s(.+)$/,
      headerCorrespondence: ['icon', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'scope-empty': [1, 'always'], // 范围可为空
  },
});
