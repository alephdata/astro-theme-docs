import path from 'node:path';
import { visit } from 'unist-util-visit';

/*
 *
 */
export default function fixAbsoluteLinks(root) {
  return () => {
    return (tree) => {
      visit(tree, ['link', 'image'], (node) => {
        if (node.url.startsWith('/')) {
          node.url = path.join(root, node.url);
        }
      });
    };
  };
}
