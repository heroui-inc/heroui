import type {Callout as FDCallout} from "fumadocs-ui/components/callout";
import type {MDXComponents} from "mdx/types";
import type {ReactNode} from "react";

import {Bulb, CircleCheckFill, CircleXmarkFill, TriangleExclamationFill} from "@gravity-ui/icons";
import {Card, Cards} from "fumadocs-ui/components/card";
import {Pre} from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {Suspense} from "react";

import {CollapsibleCode} from "./components/collapsible-code";
import {ComponentPreview, ComponentPreviewFallback} from "./components/component-preview";
import {ComponentsIndex} from "./components/components-index";
import {CopyPrompt} from "./components/copy-prompt";
import {DocsImage} from "./components/docs-image";
import {Iconify} from "./components/iconify";
import {LocaleLink} from "./components/locale-link";
import {InlineIcon} from "./components/mdx-inline-icon";
import {StatusCheck, StatusCross, StatusWarning} from "./components/mdx-status-icons";
import {
  ImageHeroView as NativeImageHeroView,
  QRPreviewPopover as NativeQRPreviewPopover,
  TryOnDevice as NativeTryOnDevice,
  VideoPlayerView as NativeVideoPlayerView,
} from "./components/native";
import {NewsletterForm} from "./components/newsletter-form";
import {RelatedComponents as RelatedComponentsComponent} from "./components/related-components";
import {VideoPlayer} from "./components/video-player";
import {getComponentCount, getExampleCount} from "./demos";
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

function ComponentCount({locale}: {locale?: string} = {}) {
  return <>{getComponentCount(locale)}</>;
}

function ExampleCount({locale}: {locale?: string} = {}) {
  return <>{getExampleCount(locale)}</>;
}

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
    <LocaleLink
      className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
      href={href}
    >
      <h3 className="mb-2 font-semibold">{name}</h3>
      <p className="text-sm text-muted">{description}</p>
    </LocaleLink>
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

function ComponentPreviewWithSuspense(props: React.ComponentProps<typeof ComponentPreview>) {
  return (
    <Suspense fallback={<ComponentPreviewFallback />}>
      <ComponentPreview {...props} />
    </Suspense>
  );
}

type CalloutKind = "error" | "idea" | "info" | "success" | "warning";

/** Info notes are plain text; the other kinds keep a colored icon so the warning reads at a glance. */
const CALLOUT_ICONS: Record<CalloutKind, ReactNode> = {
  error: <CircleXmarkFill className="text-danger" />,
  idea: <Bulb className="text-warning" />,
  info: null,
  success: <CircleCheckFill className="text-success" />,
  warning: <TriangleExclamationFill className="text-warning" />,
};

/** Flat note: a soft fill, body-colored text; no border, bar or shadow. */
function Callout({
  children,
  className,
  icon,
  title,
  type = "info",
  ...props
}: React.ComponentProps<typeof FDCallout>) {
  const kind: CalloutKind = type === "warn" ? "warning" : type;
  const resolvedIcon = icon ?? CALLOUT_ICONS[kind];

  return (
    <div
      data-callout={kind}
      className={cn(
        "my-5 flex gap-3 rounded-2xl bg-(--docs-card) px-4 py-3 text-sm leading-6 text-(--docs-fg)",
        className,
      )}
      {...props}
    >
      {resolvedIcon ? (
        <span aria-hidden className="flex h-6 shrink-0 items-center [&>svg]:size-4">
          {resolvedIcon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <p className="my-0! font-medium text-foreground">{title}</p> : null}
        <div className="prose-no-margin empty:hidden">{children}</div>
      </div>
    </div>
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
    ComponentCount,
    ComponentGrid,
    ComponentPreview: ComponentPreviewWithSuspense,
    ComponentsIndex,
    CopyPrompt,
    DocsImage,
    ExampleCount,
    Icon,
    Info,
    InlineIcon,
    Link: LocaleLink,
    NativeImageHeroView,
    NativeQRPreviewPopover,
    NativeTryOnDevice,
    NativeVideoPlayerView,
    NewsletterForm,
    PackageManagers,
    Pre,
    Preview,
    RelatedComponents,
    Star,
    StatusCheck,
    StatusCross,
    StatusWarning,
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
