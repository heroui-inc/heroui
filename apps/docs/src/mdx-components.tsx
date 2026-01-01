import type {MDXComponents} from "mdx/types";

import Link from "fumadocs-core/link";
import {Callout as FDCallout} from "fumadocs-ui/components/callout";
import {Card, Cards} from "fumadocs-ui/components/card";
import {Pre} from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {Suspense} from "react";

import {CollapsibleCode} from "./components/collapsible-code";
import {ComponentPreview} from "./components/component-preview";
import {ComponentsCategory} from "./components/components-category";
import {DocsImage} from "./components/docs-image";
import {Iconify} from "./components/iconify";
import {NativeComponentsCategory} from "./components/native-components-category";
import {NativeVideoPlayerView} from "./components/native-video-player-view";
import {NewsletterForm} from "./components/newsletter-form";
import {RelatedComponents as RelatedComponentsComponent} from "./components/related-components";
import {RelatedShowcases as RelatedShowcasesComponent} from "./components/related-showcases";
import {VideoPlayer} from "./components/video-player";
import {FumadocsCustomCodeblock as CodeBlock} from "./mdx-components/fumadocs-custom-codeblock";
import {PackageManagers} from "./mdx-components/package-managers";
import {cn} from "./utils/cn";

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
    <div className="my-6 flex items-center justify-center rounded-lg border bg-background p-6">
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
    <a className="block rounded-lg border p-4 transition-colors hover:bg-muted/50" href={href}>
      <h3 className="mb-2 font-semibold">{name}</h3>
      <p className="text-sm text-muted">{description}</p>
    </a>
  );
}

// Wrapper component for RelatedShowcases with Suspense
function RelatedShowcases(props: any) {
  return (
    <Suspense fallback={null}>
      <RelatedShowcasesComponent {...props} />
    </Suspense>
  );
}

// Wrapper component for RelatedComponents with Suspense
function RelatedComponents(props: any) {
  return (
    <Suspense fallback={null}>
      <RelatedComponentsComponent {...props} />
    </Suspense>
  );
}

function Callout({className, ...props}: React.ComponentProps<typeof FDCallout>) {
  return (
    <FDCallout
      {...props}
      className={cn("bg-surface text-surface-foreground shadow-surface", className)}
    />
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
    ComponentsCategory,
    DocsImage,
    Icon,
    Info,
    Link,
    NativeComponentsCategory,
    NativeVideoPlayerView,
    NewsletterForm,
    PackageManagers,
    Preview,
    RelatedComponents,
    RelatedShowcases,
    Star,
    VideoPlayer,
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
      const classes = cn(
        "mdx-code-block",
        lineCount > MAX_LINES_FOR_LINE_NUMBERS ? "docs-code-block-line-numbers" : undefined,
        props.className,
      );

      return (
        <CodeBlock {...props} className={classes}>
          <Pre>{children}</Pre>
        </CodeBlock>
      );
    },
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
