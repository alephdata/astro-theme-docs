const importNode = (name, path) => ({
  type: 'mdxjsEsm',
  data: {
    estree: {
      type: 'Program',
      // The AST is equivalent to `import { name } from 'path'`.Check out
      // https://astexplorer.net/ to convert JS programs to the respective ASTs.
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              imported: {
                type: 'Identifier',
                name,
              },
              local: {
                type: 'Identifier',
                name,
              },
            },
          ],
          source: {
            type: 'Literal',
            value: path,
          },
        },
      ],
      sourceType: 'module',
      comments: [],
    },
  },
});

/*
 * Injects ESM import declarations for components commonly used in MDX files
 * (e.g. `Callout`) so authors don't need to manually include them.
 */
export default function injectComponents(components) {
  return () => {
    const imports = Object.entries(components).map(([name, path]) =>
      importNode(name, path)
    );

    return (tree) => {
      tree.children.unshift(...imports);
    };
  };
}
