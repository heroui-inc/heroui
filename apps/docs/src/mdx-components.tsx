import type {MDXComponents} from "mdx/types";

import {Callout} from "fumadocs-ui/components/callout";
import {Card, Cards} from "fumadocs-ui/components/card";
import {CodeBlock, Pre} from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";

import {CollapsibleCode} from "./components/collapsible-code";
import {ComponentPreview} from "./components/component-preview";
import {DocsImage} from "./components/docs-image";
import {Iconify} from "./components/iconify";
import {PackageManagers} from "./mdx-components/package-managers";

// Create icon components using gravity-ui icons
const AlertTriangle = (props: any) => <Iconify {...props} icon="circle-exclamation-fill" />;
const CheckCircle = (props: any) => <Iconify {...props} icon="circle-check-fill" />;
const XCircle = (props: any) => <Iconify {...props} icon="circle-xmark-fill" />;
const Info = (props: any) => <Iconify {...props} icon="circle-info-fill" />;
const X = (props: any) => <Iconify {...props} icon="xmark" />;
const Star = (props: any) => <Iconify {...props} icon="star-fill" />;

const Icon = (props: any) => <Iconify {...props} />;

const MAX_LINES_FOR_LINE_NUMBERS = 20;

function Preview({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-background my-6 flex items-center justify-center rounded-lg border p-6">
      {children}
    </div>
  );
}

function ComponentGrid({children}: {children: React.ReactNode}) {
  return <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}

function ComponentCard({
  description,
  href,
  name,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <a className="hover:bg-muted/50 block rounded-lg border p-4 transition-colors" href={href}>
      <h3 className="mb-2 font-semibold">{name}</h3>
      <p className="text-muted text-sm">{description}</p>
    </a>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    AlertTriangle,
    Callout,
    Card,
    Cards,
    CheckCircle,
    CodeBlock,
    CollapsibleCode,
    ComponentCard,
    ComponentGrid,
    ComponentPreview,
    DocsImage,
    Icon,
    Info,
    PackageManagers,
    Preview,
    Star,
    X,
    XCircle,
    // HTML `ref` attribute conflicts with `forwardRef`
    pre: ({children, ref: _ref, ...props}) => {
      // Check if the code has more than 5 lines
      let lineCount = 1;

      // Extract the text content to count lines
      const extractText = (node: any): string => {
        if (typeof node === "string") return node;
        if (node?.props?.children) {
          if (Array.isArray(node.props.children)) {
            return node.props.children.map(extractText).join("");
          }

          return extractText(node.props.children);
        }

        return "";
      };

      const codeContent = extractText(children);

      lineCount = codeContent.split("\n").length;

      // Only add line numbers class if more than 5 lines
      const className =
        lineCount > MAX_LINES_FOR_LINE_NUMBERS ? "docs-code-block-line-numbers" : undefined;

      return (
        <CodeBlock {...props} className={className}>
          <Pre>{children}</Pre>
        </CodeBlock>
      );
    },
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
