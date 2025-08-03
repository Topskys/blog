import { defineConfig } from "vitepress";
import { BASE_URL, REPOSITORY_URL } from "./custom.config";

// https://vitepress.dev/reference/site-config
// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  base: BASE_URL,
  title: "Lok's Blog",
  description: "这是 Lok 的个人博客，记录日常学习与技术分享。",
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }],
    [
      "meta",
      {
        property: "og:repository-url",
        content: REPOSITORY_URL,
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "大前端",
        items: [
          { text: "JavaScript", link: "/javascript" },
          { text: "TypeScript", link: "/typescript" },
          { text: "React", link: "/react" },
          { text: "Next", link: "/next" },
          { text: "Vue", link: "/vue" },
          { text: "Node", link: "/nodejs" },
          { text: "Uniapp", link: "/uniapp" },
          { text: "Electron", link: "/electron" },
          { text: "React Native", link: "/react-native" },
          { text: "工程化", link: "/webpack" },
        ],
      },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "使用VitePress搭建个人博客",
        link: "使用VitePress搭建个人博客",
      },
    ],

    socialLinks: [{ icon: "github", link: REPOSITORY_URL }],

    logo: {
      src: "/favicon.ico",
      style: { borderRadius: "50%" },
    },
    lastUpdated: {
      text: "最后更新于",
    },
    search: {
      provider: "local",
    },
    editLink: {
      pattern: `${REPOSITORY_URL}/edit/main/docs/:path`,
      text: "在 GitHub 上编辑此页",
    },
    outline: {
      level: "deep",
      label: "页面导航",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2019-${new Date().getFullYear()} Lok`,
    },
  },
});
