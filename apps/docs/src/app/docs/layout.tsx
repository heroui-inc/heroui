import type {ReactNode} from "react";

import {DocsLayout} from "fumadocs-ui/layouts/docs";

import {baseOptions} from "@/app/layout.config";
import {source} from "@/lib/source";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
