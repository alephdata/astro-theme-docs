import { visit } from 'unist-util-visit';

const HEADING_CLASSES = ['alpha', 'beta', 'gamma'];

/*
 * Adds classes to headings and other content elements. For example, `<h2>` becomes
 * `<h2 class="beta">. Many HTML elements should have default styles applied to them
 * when used in a documentation article. However, there may be cases where those
 * we don’t need the default styles, e.g. when using a list for a horizontal navigation.
 * Applying the default styles explicitly using classes is easier and has fewer side
 * effects compared to applying them using tag selectors (in which case they'd need to
 * be reset manually whenever the default styles are not needed).
 */
export default function explorerLinks() {
  return () => {
    return (tree) => {
      visit(tree, ['heading', 'list'], (node) => {
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};

        if (node.type === 'heading') {
          node.data.hProperties = {
            ...node.data.hProperties,
            class: HEADING_CLASSES[node.depth - 1],
          };

          return;
        }

        if (node.type === 'list') {
          node.data.hProperties = {
            ...node.data.hProperties,
            class: node.ordered ? 'ordered-list' : 'unordered-list',
          };

          return;
        }
      });
    };
  };
}
