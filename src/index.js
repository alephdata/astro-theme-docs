import path from 'node:path';
import url from 'node:url';
import mdx from '@astrojs/mdx';

import defaultClasses from './plugins/defaultClasses.js';
import injectComponents from './plugins/injectComponents.js';
import wrapContents from './plugins/wrapContents.js';
import customCodeComponent from './plugins/customCodeComponent.js';
import fixAbsoluteLinks from './plugins/fixAbsoluteLinks.js';

const srcRoot = path.dirname(url.fileURLToPath(import.meta.url));
const componentsEntry = path.join(srcRoot, 'components/index.js');

export default ({ markdownPlugins = [], mdxPlugins = [] } = {}) => [
  {
    name: 'astro-theme-docs',
    hooks: {
      'astro:config:setup': ({ config, updateConfig }) => {
        updateConfig({
          markdown: {
            syntaxHighlight: false,
            extendDefaultPlugins: true,
            remarkPlugins: [
              customCodeComponent(),
              defaultClasses(),
              fixAbsoluteLinks(config.base),
              ...markdownPlugins,
            ],
          },
        });
      },
    },
  },
  mdx({
    remarkPlugins: [
      wrapContents('RichContent'),
      injectComponents({
        RichContent: componentsEntry,
        Callout: componentsEntry,
        LinkCard: componentsEntry,
        Youtube: componentsEntry,
        Code: componentsEntry,
      }),
      ...mdxPlugins,
    ],
  }),
];

export { defaultClasses, injectComponents, wrapContents, customCodeComponent };
