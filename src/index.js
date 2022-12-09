import path from 'node:path';
import url from 'node:url';
import mdx from '@astrojs/mdx';

import defaultClasses from './plugins/defaultClasses.js';
import injectComponent from './plugins/injectComponent.js';
import wrapContents from './plugins/wrapContents.js';
import customCodeComponent from './plugins/customCodeComponent.js';
import fixAbsoluteLinks from './plugins/fixAbsoluteLinks.js';

const srcRoot = path.dirname(url.fileURLToPath(import.meta.url));
const componentsEntry = path.join(srcRoot, 'components/index.js');

export default ({ markdownPlugins = [], mdxPlugins = [] } = {}) => {
  const themeIntegration = {
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
  };

  const mdxIntegration = mdx({
    remarkPlugins: [
      wrapContents('RichContent'),
      injectComponent('RichContent', componentsEntry, 'named'),
      injectComponent('Callout', componentsEntry, 'named'),
      injectComponent('LinkCard', componentsEntry, 'named'),
      injectComponent('Youtube', componentsEntry, 'named'),
      injectComponent('Code', componentsEntry, 'named'),
      injectComponent('Figure', componentsEntry, 'named'),
      injectComponent('Image', componentsEntry, 'named'),
      injectComponent('Steps', componentsEntry, 'named'),
      injectComponent('Step', componentsEntry, 'named'),
      ...mdxPlugins,
    ],
  });

  return [themeIntegration, mdxIntegration];
};

export * from './utils/git.js';
export { defaultClasses, injectComponent, wrapContents, customCodeComponent };
