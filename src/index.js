import path from 'node:path';
import url from 'node:url';
import mdxBase from '@astrojs/mdx';

import defaultClasses from './plugins/defaultClasses.js';
import injectComponent from './plugins/injectComponent.js';
import wrapContents from './plugins/wrapContents.js';
import customCodeComponent from './plugins/customCodeComponent.js';

const srcRoot = path.dirname(url.fileURLToPath(import.meta.url));
const componentsEntry = path.join(srcRoot, 'components/index.js');

function mdx(remarkPlugins = []) {
  return mdxBase({
    extendMarkdownConfig: true,
    remarkPlugins: [
      defaultClasses(),
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
      injectComponent('Mermaid', componentsEntry, 'named'),
      injectComponent('Markdown', componentsEntry, 'named'),
      ...remarkPlugins,
    ],
  });
}

export default ({ remarkPlugins }) => [
  mdx(remarkPlugins),
];

export * from './utils/git.js';
export { defaultClasses, injectComponent, wrapContents, customCodeComponent };
