import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { rehypePrettyCode } from "rehype-pretty-code";
import * as z from "zod";

const docsSchema = frontmatterSchema.extend({
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

// Define the paths of Fumadocs mdx files and schemas
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsSchema
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
      plugins.push(preProcess)
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          }
        },
      ])
      return plugins
    }
  },
});


const preProcess = () => (tree: any) => {
  console.log(tree)
}
