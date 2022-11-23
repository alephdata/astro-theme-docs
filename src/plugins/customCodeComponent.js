import { visit } from 'unist-util-visit';

/*
 * Transforms Markdown code fences to the <Code /> component. Our <Code />
 * component is a slim wrapper around Astro's default <Code /> component that
 * adds support for the `title` property as well as some custom styling. For
 * example, the following Markdown/MDX will render the `hello_world.py` as a
 * title for the code block:
 *
 * ```py title="hello_world.py"
 * print("Hello World!")
 * ```
 */
export default function customCodeComponent() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      const componentNode = {
        type: 'mdxJsxFlowElement',
        name: 'Code',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'lang', value: node.lang },
          { type: 'mdxJsxAttribute', name: 'code', value: node.value },
          { type: 'mdxJsxAttribute', name: 'meta', value: node.meta },
        ],
      };

      parent.children.splice(index, 1, componentNode);
    });
  };
}
