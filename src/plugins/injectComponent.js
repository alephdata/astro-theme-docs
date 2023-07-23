/*
 * Inject an ESM import declaration for a component commonly used in MDX files
 * (e.g. `Callout`) so authors don't need to import them manually.
 */
export default function injectComponents(name, path, type = 'default') {
  return () => {
    return (tree) => {
      tree.children.unshift(importNode(name, path, type));
    };
  };
}

function importNode(name, path, type) {
  return {
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        // The AST is equivalent to `import { name } from 'path'` (if type is `named`)
        // or `import name from 'path'` (if type is `default`). Take a look at
        // https://astexplorer.net/ to convert JS programs to the respective ASTs.
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [importSpecifier(name, type)],
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
  };
}

function importSpecifier(name, type) {
  if (type === 'named') {
    return {
      type: 'ImportSpecifier',
      imported: {
        type: 'Identifier',
        name,
      },
      local: {
        type: 'Identifier',
        name,
      },
    };
  }

  if (type === 'default') {
    return {
      type: 'ImportDefaultSpecifier',
      local: {
        type: 'Identifier',
        name,
      },
    };
  }

  throw new Exception('Unsupported specifier type.');
}
