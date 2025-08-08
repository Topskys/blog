import mediumZoom from 'medium-zoom';
import busuanzi from 'busuanzi.pure.js';
import DefaultTheme from 'vitepress/theme';
import { onMounted, watch, nextTick } from 'vue';
import { inBrowser, useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import Confetti from './components/Confetti.vue';
import DataPanel from './components/DataPanel.vue';
import './styles/index.css';

const components = {
  Confetti,
  DataPanel,
};

export default {
  extends: DefaultTheme,

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };

    // giscus配置
    giscusTalk(
      {
        repo: 'Topskys/blog',
        repoId: 'R_kgDOPVcfjQ',
        category: 'General',
        categoryId: 'DIC_kwDOPVcfjc4CtuK8',
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
        loading: 'lazy',
        crossorigin: 'anonymous',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        theme: 'preferred_color_scheme',
      },
      {
        frontmatter,
        route,
      },
      true,
    );

    onMounted(() => {
      initZoom();
    });

    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );
  },

  enhanceApp({ app, router }) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value);
    });

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
};
