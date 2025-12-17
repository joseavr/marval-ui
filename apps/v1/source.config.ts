// @ts-nocheck
// Prevent deployment to fail because of typescript errors in this file

import { transformers } from '@/lib/highlight-code';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import type { Element, ElementData, Literal, Root } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { visit } from 'unist-util-visit';
import * as z from "zod";
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';

// Define the paths of Fumadocs mdx files and schemas
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      isPublished: z.boolean().optional().default(false),
      releaseDate: z.coerce.date().optional(),
      
      metadata: z.object({
        github: z.object({
          repoUrl: z.object({
            label: z.string(),
            url: z.string()
          }),
          createIssueUrl: z.string(),
          openIssuesUrl: z.string()
        }),
        editPageUrl: z.string(),
        credits: z.array(
          z.object({
            name: z.string(),
            url: z.string(),
          })
        ).optional()
      }).optional()
    })
  },
  meta: {
    schema: metaSchema,
  },
});

// Set up mdx plugings
export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypePlugins: (plugins) => {
      //clean up (idk but it makes preprocess work)
      plugins.shift()
      plugins.push(preProcess)

      plugins.push(
        [
          // Add anchor tags to headings (h1-h6)
          // and use `rehypeSlug` generated IDs for href 
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      )
      plugins.push([
        // Add code syntax highlighting and line highlighting code
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers
        },
      ])
      return plugins
    },
  },
});


/**
 * A Rehype transformer that walk through the nodes using `unist-util-visit` package. Do the following on these tags:
 * 
 * Pre:
 * - Inspects `<pre><code/></pre>` blocks
 * - Extracts metadata from the code block's `meta` string.
 * - The transformer sets a series of custom properties on the `<pre>` element:
 * - `__filepath__` – extracted from `filepath="..."` in the meta string  
 * - `__showHeader__` – `true` if the `showHeader` keyword is present  
 * - `__isExpanded__` – `true` if the `expanded` keyword is present  
 * - `__raw__` – the raw code content  
 * - `__language__` – language (derived from the `className` on the `<code>` node)
 *
 * @see {@link https://github.com/syntax-tree/unist-util-visit | unist-util-visit Documentation}
 * @see {@link https://github.com/syntax-tree/hast?tab=readme-ov-file#types | hast (hypertext abstract syntax tree) types Documentation}
 */
function preProcess() {
  return (tree: Root) => {
    //
    // `RootData` type from `hast` is incompatible with `Data` from
    // `unist-util-visit`. Extend `RootData` with an index signature:
    //
    // ```ts
    // export interface RootData extends Data {
    //   [key: string]: string;
    // }
    // ```
    //
    visit(tree, (node) => {
      const currNode = (node as unknown) as Element & ElementData;

      // pre node
      if (currNode?.type === "element" && currNode?.tagName === "pre" && currNode.children) {
        const [element] = node.children as (Element & ElementData)[];
        if (element.tagName !== "code") return;
        const codeElement = element;

        // make regex
        const fileRegex = /filepath="(.*)"/;
        const showHeaderRegex = /\bshowHeader\b/;
        const showExpandRegex = /\bshowExpand\b/;

        // apply regex
        const fileMatch = codeElement.data?.meta?.match(fileRegex) ?? undefined;
        const isHeaderPresent = showHeaderRegex.test(codeElement.data?.meta || "");
        const isExpandPresent = showExpandRegex.test(codeElement.data?.meta || "");

        // set metadata to pre node
        currNode.properties.__filepath__ = fileMatch ? fileMatch[1] : undefined;
        currNode.properties.__showHeader__ = isHeaderPresent;
        currNode.properties.__showExpand__ = isExpandPresent;

        const codeElementChildren = codeElement.children as (Element & ElementData & Literal)[];
        const currNodeChildren = currNode.children as (Element & ElementData)[];

        if (currNodeChildren[0].properties.className === undefined) {
          throw new Error("Message: Must specify the language in the code block");
        }
        currNode.properties.__raw__ = codeElementChildren?.[0].value;
        currNode.properties.__language__ =
          (currNodeChildren[0].properties.className as string[])[0].split("-")[1];
      }
    });
  };
}
