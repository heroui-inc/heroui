import type {MDXComponents} from "mdx/types";

import React from "react";
import _jsx_runtime from "react/jsx-runtime";
import ReactDOM from "react-dom";

type MDXContentProps = {
  [props: string]: unknown;
  components?: MDXComponents;
};

export const getMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {},
): React.FC<MDXContentProps> => {
  const scope = {React, ReactDOM, _jsx_runtime, ...globals};
  const fn = new Function(...Object.keys(scope), code);

  return fn(...Object.values(scope)).default;
};

export const useMDXComponent = (code: string, globals: Record<string, unknown> = {}) => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
};
