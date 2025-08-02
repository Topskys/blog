import { defineConfig } from 'vitepress'

// Repository name
const base = '/blog/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "My Awesome Project",
  description: "A VitePress Site",
  // 当设置为 true 时，VitePress 不会因为死链而导致构建失败。
  // https://vitepress.dev/zh/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ],
      },
      {
        text: '使用VitePress搭建个人博客',
        link: '使用VitePress搭建个人博客'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
