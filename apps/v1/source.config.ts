import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { rehypePrettyCode } from "rehype-pretty-code";

// Define the paths of Fumadocs mdx files
export const docs = defineDocs({
  dir: 'content/docs',
});

// Set up mdx plugings
export default defineConfig({
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
