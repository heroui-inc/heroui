import {defineConfig, defineDocs} from "fumadocs-mdx/config";
import {rehypeCodeDefaultOptions} from "fumadocs-core/mdx-plugins";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      // Preserve meta strings in the output
      meta: true,
    },
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
