import { inBrowser } from "vitepress";
import busuanzi from "busuanzi.pure.js";
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import giscusTalk from "vitepress-plugin-comment-with-giscus";
import { REPOSITORY_URL } from "../custom.config";
import DataPanel from "./components/DataPanel.vue";
import "./styles/index.css";

export default {
  extends: DefaultTheme,

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    // giscus配置
    giscusTalk(
      {
        repo: "Topskys/blog",
        repoId: "R_kgDOPVcfjQ",
        category: "General",
        categoryId: "DIC_kwDOPVcfjc4CtuK8",
        mapping: "pathname",
        inputPosition: "bottom",
        lang: "zh-CN",
        loading: "lazy",
        crossorigin: "anonymous",
        strict: "0",
        reactionsEnabled: "1",
        emitMetadata: "0",
        theme: "preferred_color_scheme",
      },
      {
        frontmatter,
        route,
      },
      true
    );
  },

  enhanceApp({ app, router }) {
    app.component("DataPanel", DataPanel);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
};
