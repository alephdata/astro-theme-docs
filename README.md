# astro-theme-docs

This repository contains a custom theme and a set of reusable components for [Astro](https://astro.build), a static site generator (SSG). We use this as the foundation for multiple documentation sites the OCCRP Aleph team maintains (including [Aleph](https://docs.aleph.occrp.org), [FollowTheMoney](https://alephdata.github.io/followthemoney), and [Memorious](https://alephdata.github.io/memorious)).

Astro is a generic SSG and (unlike projects like MkDocs or mdBook) isn’t intended to be used for documentation sites exclusively. The advantage of this approach is that we have more flexibility to customize how the documentation is rendered and can for example include interactive elements in the documentation or auto-generate pages. For example, we auto-generate a documentation page for every schema ([like this one](https://alephdata.github.io/followthemoney/explorer/schemata/Company/)) in the FollowTheMoney data model based on the schema definition.

The main disadvantage of this approach is that we have had to implement a few features ourselves that are common to every documentation site (for example, navigation, multi-column layout, …).

## Seting up a new site

Bootstrap a new Astro project following the steps in the [Astro documentation](https://docs.astro.build/en/install/manual/).

### 1. Install

```
npm install github:alephdata/astro-theme-docs
```

### 2. Configure

Add the theme to the Astro configuration in `astro.config.mjs`:

```diff
  import { defineConfig } from 'astro/config';
+ import theme from 'astro-theme-docs';
  
  // https://astro.build/config
  export default defineConfig({
+   integrations: [theme()],
  });
```

Create `src/options.json` based on the following example and customize the options:

```jsonc
{
  // The site title
  "title": "Aleph",
  
  // These options are used to display the date was last updated and to generate
  // links to edit a page on GitHub.
  "git": {
    "branch": "main",
    "githubRepoUrl": "https://github.com/alephdata/aleph"
  },
  
  // Configure which pages appear in which order in the sidebar navigation.
  "nav": {
    "sidebar": {
      "sections": [
        {
          "title": "Getting Started",
          "items": [
            // The title and URL of the navigation item is generated automatically
            // based on the page contents.
            { "slug": "/about" }
          
            {
              "slug": "/installation",
              "children": {
                // Pages can be nested. Nesting is limited to one level.
                { "slug": "/installation/development" },
                { "slug": "/installation/production" },
              },
            },
            
            // Linking to external pages.
            {
              "title": "API Reference",
              "link": "https://example.org",
              "external": true
            }
          ]
        }
      }
    }
  }
}
```

### 3. Create a layout

Create `src/layouts/DocsLayout.astro`:

```astro
---
import { DocsLayout } from 'astro-theme-docs/components';
import options from '../options.json';
---

<DocsLayout {options} {...Astro.props}>
  <slot />
  <slot name="sidebar" slot="sidebar" />
  <slot name="meta" slot="meta" />
  <slot name="toc" slot="toc" />
</DocsLayout>
```

### 4. Add a page

Create `src/pages/index.mdx`:

```
---
title: Welcome! # Used as the meta title and in the navigation sidebar
layout: 'src/layouts/DocsLayout.astro'
---

# Welcome

Use standard Markdown to write documentation articles.

Or use prebuilt components:

<Youtube id="dQw4w9WgXcQ" />
```
