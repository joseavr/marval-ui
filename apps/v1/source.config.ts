import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { rehypePrettyCode } from "rehype-pretty-code";
import * as z from "zod";
import { transformers } from '@/lib/highlight-code';
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { visit } from 'unist-util-visit';
import type { Element, Root, ElementData, Literal } from "hast"


// Define the paths of Fumadocs mdx files and schemas
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      published: z.boolean().optional().default(false),
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
      //clean up plugins array
      plugins.shift()
      plugins.shift()
      plugins.push(preProcess)
      plugins.push(rehypeSlug) // Add IDs to headings (h1 through h6)
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
    }
  },
});


// 
const preProcess= () => (tree: Root) => {
  /**
   * `RootData` type from `hast` does not match `Data` type from `unist-util-visit`
   * Add the following to `RootData` to fix type:
    ```
    export interface RootData extends Data {
      [key:string]: string
    }
    ```
   */
	visit(tree, (node) => {
    const currNode =  (node as unknown) as Element & ElementData

    // pre node
    if (currNode?.type === "element" && currNode?.tagName === "pre") {
      const [element] = node.children as (Element & ElementData)[]
			if (element.tagName !== "code") return
      const codeElement = element 

			// make regex
			const fileRegex = /filepath="(.*)"/
			const showHeaderRegex = /\bshowHeader\b/
			const expandedRegex = /\bexpanded\b/

      // apply regex
			const fileMatch = codeElement.data?.meta?.match(fileRegex) ?? undefined
			const isHeaderPresent = showHeaderRegex.test(codeElement.data?.meta || "")
			const isExpanded = expandedRegex.test(codeElement.data?.meta || "")

      // set metadata to pre node
  		currNode.properties.__filepath__ = fileMatch ? fileMatch[1] : undefined
			currNode.properties.__showHeader__ = isHeaderPresent
			currNode.properties.__isExpanded__ = isExpanded

      const codeElementChildren = codeElement.children as (Element & ElementData & Literal)[]
      const currNodeChildren = currNode.children as (Element & ElementData)[]

      if (currNodeChildren[0].properties.className === undefined) {
        throw new Error("Message: Must specify the language in the code block")
      }
      currNode.properties.__raw__ = codeElementChildren?.[0].value
			currNode.properties.__language__ =
      (currNodeChildren[0].properties.className as string[])[0].split("-")[1]
		}
	})
}
