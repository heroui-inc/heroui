"use client";

import type {MDXComponents as MDXComponentsType} from "mdx/types";

import {MDXComponents} from "./mdx-components";

import {useMDXComponent} from "@/hooks/use-mdx-component";

interface MDXContentProps {
  code: string;
}

export function MDXContent({code}: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={MDXComponents as MDXComponentsType} />
    </div>
  );
}
