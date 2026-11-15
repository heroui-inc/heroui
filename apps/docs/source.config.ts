import {rehypeCodeDefaultOptions} from "fumadocs-core/mdx-plugins";
import {defineConfig, defineDocs} from "fumadocs-mdx/config";

import {docsShikiOptions} from "./src/lib/shiki-themes";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      ...docsShikiOptions,
      // Preserve meta strings in the output
      // meta: true,
    },
    rehypePlugins: [],
    remarkNpmOptions: {
      persist: {
        id: "package-manager",
      },
    },
    remarkPlugins: [],
  },
});
