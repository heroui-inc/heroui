import type {MDXComponents} from "mdx/types";

import defaultMdxComponents from "fumadocs-ui/mdx";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}
