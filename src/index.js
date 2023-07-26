import path from 'node:path';
import url from 'node:url';
import mdxBase from '@astrojs/mdx';

import defaultClasses from './plugins/defaultClasses.js';
import injectComponent from './plugins/injectComponent.js';
import wrapContents from './plugins/wrapContents.js';
import customCodeComponent from './plugins/customCodeComponent.js';
import fixAbsoluteLinks from './plugins/fixAbsoluteLinks.js';

const srcRoot = path.dirname(url.fileURLToPath(import.meta.url));
const componentsEntry = path.join(srcRoot, 'components/index.js');

function mdx(astroConfig, remarkPlugins = []) {
  return mdxBase({
    extendMarkdownConfig: true,
    remarkPlugins: [
      defaultClasses(),
      fixAbsoluteLinks(astroConfig.base),
      customCodeComponent(),
      wrapContents('RichContent'),
      injectComponent('RichContent', componentsEntry, 'named'),
      injectComponent('Callout', componentsEntry, 'named'),
      injectComponent('LinkCard', componentsEntry, 'named'),
      injectComponent('Youtube', componentsEntry, 'named'),
      injectComponent('Code', componentsEntry, 'named'),
      injectComponent('Figure', componentsEntry, 'named'),
      injectComponent('Image', componentsEntry, 'named'),
      injectComponent('Video', componentsEntry, 'named'),
      injectComponent('Steps', componentsEntry, 'named'),
      injectComponent('Step', componentsEntry, 'named'),
      ...remarkPlugins,
    ],
  });
}

export default ({ remarkPlugins = [] } = {}) => {
  return {
    name: 'astro-theme-docs',
    hooks: {
      'astro:config:setup': async (hookParams) => {
        // This is a hacky workaround in order to be able to access the
        // Astro site base URL when initializing remark plugins. This may
        // break when the MDX integration changes (e.g. when it starts
        // relying on additional hooks).
        const mdxIntegration = mdx(hookParams.config, remarkPlugins);
        const setupHook = mdxIntegration.hooks['astro:config:setup'];
        await setupHook(hookParams);
      },
    },
  };
};

export * from './utils/git.js';
export { defaultClasses, injectComponent, wrapContents, customCodeComponent };
