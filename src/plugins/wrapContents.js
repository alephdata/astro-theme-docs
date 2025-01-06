/*
 * Wraps all nodes in a JSX component in order to apply specific styles
 * to Markdown/MDX contents (e.g. spacing between elements).
 */
export default function wrapContents(componentName) {
  return () => {
    return (tree) => {
      const wrapperNode = {
        type: 'mdxJsxFlowElement',
        name: componentName,
        attributes: [],
        children: tree.children,
      };

      tree.children = [wrapperNode];
    };
  };
}
