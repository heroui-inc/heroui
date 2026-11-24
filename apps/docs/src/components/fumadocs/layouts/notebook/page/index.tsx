import type {BreadcrumbProps, FooterProps} from "./client";
import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps, ReactNode} from "react";

import {T} from "@fuma-translate/react";
import {TOCProvider, TOCScrollArea} from "fumadocs-ui/components/toc";
import {buttonVariants} from "fumadocs-ui/components/ui/button";

import {Edit} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";

import {ActiveHeadingProvider} from "./active-heading";
import {
  PageBreadcrumb,
  PageFooter,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverTrigger,
} from "./client";
import {TOCItems} from "./toc-items";

interface BreadcrumbOptions extends BreadcrumbProps {
  enabled: boolean;
  component: ReactNode;
}

interface FooterOptions extends FooterProps {
  enabled: boolean;
  component: ReactNode;
}

export interface DocsPageProps {
  toc?: TOCItemType[];
  tableOfContent?: Partial<TableOfContentOptions>;
  tableOfContentPopover?: Partial<TableOfContentPopoverOptions>;

  /**
   * Extend the page to fill all available space
   *
   * @defaultValue false
   */
  full?: boolean;

  /**
   * Replace or disable breadcrumb
   */
  breadcrumb?: Partial<BreadcrumbOptions>;

  /**
   * Footer navigation, you can disable it by passing `false`
   */
  footer?: Partial<FooterOptions>;

  children?: ReactNode;
}

type TableOfContentOptions = {
  /**
   * Custom content in TOC container, before the main TOC
   */
  header?: ReactNode;

  /**
   * Custom content in TOC container, after the main TOC
   */
  footer?: ReactNode;

  enabled: boolean;
  component: ReactNode;

  /**
   * @defaultValue 'normal'
   */
  style?: "normal" | "clerk";
};

type TableOfContentPopoverOptions = TableOfContentOptions;

export function DocsPage({
  breadcrumb: {component: breadcrumb, enabled: breadcrumbEnabled = true, ...breadcrumbProps} = {},
  children,
  footer = {},
  full = false,
  tableOfContent: {component: tocReplace, enabled: tocEnabled, ...tocOptions} = {},
  tableOfContentPopover: {
    component: tocPopover,
    enabled: tocPopoverEnabled,
    ...tocPopoverOptions
  } = {},
  toc = [],
}: DocsPageProps) {
  // disable TOC on full mode, you can still enable it with `enabled` option.
  tocEnabled ??=
    !full && (toc.length > 0 || tocOptions.footer !== undefined || tocOptions.header !== undefined);

  tocPopoverEnabled ??=
    toc.length > 0 ||
    tocPopoverOptions.header !== undefined ||
    tocPopoverOptions.footer !== undefined;

  let wrapper = (children: ReactNode) => children;

  if (tocEnabled || tocPopoverEnabled) {
    wrapper = (children) => (
      <TOCProvider toc={toc}>
        <ActiveHeadingProvider toc={toc}>{children}</ActiveHeadingProvider>
      </TOCProvider>
    );
  }

  return wrapper(
    <>
      {!!tocPopoverEnabled &&
        (tocPopover ?? (
          <PageTOCPopover>
            <PageTOCPopoverTrigger />
            <PageTOCPopoverContent>
              {tocPopoverOptions.header}
              <TOCScrollArea>
                <TOCItems />
              </TOCScrollArea>
              {tocPopoverOptions.footer}
            </PageTOCPopoverContent>
          </PageTOCPopover>
        ))}
      <article
        data-full={full}
        id="nd-page"
        className={cn(
          "flex min-w-0 flex-col gap-4 px-5 pt-8 pb-16 [grid-area:main] md:px-8 md:pt-4 xl:pt-22",
          full && "*:max-w-[1285px]",
        )}
      >
        {!!breadcrumbEnabled && (breadcrumb ?? <PageBreadcrumb {...breadcrumbProps} />)}
        {children}
        {footer.enabled !== false && (footer.component ?? <PageFooter items={footer.items} />)}
      </article>
      {!!tocEnabled &&
        (tocReplace ?? (
          <div
            className="xl:layout:[--fd-toc-width:var(--docs-toc-width)] sticky top-(--fd-docs-row-3) flex h-[calc(var(--fd-docs-height)-var(--fd-docs-row-3))] w-(--fd-toc-width) flex-col gap-1 ps-4 pe-5 pt-[96px] pb-2 [grid-area:toc] max-xl:hidden"
            id="nd-toc"
          >
            {tocOptions.header}
            <h3
              className="text-[13px] leading-[18px] font-medium text-(--docs-fg-subtle)"
              id="toc-title"
            >
              <T note="table of contents" text="On this page" />
            </h3>
            <TOCScrollArea>
              <TOCItems />
            </TOCScrollArea>
            {tocOptions.footer}
          </div>
        ))}
    </>,
  );
}

export function EditOnGitHub(props: ComponentProps<"a">) {
  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      className={cn(
        buttonVariants({
          className: "not-prose gap-1.5",
          color: "secondary",
          size: "sm",
        }),
        props.className,
      )}
    >
      {props.children ?? (
        <>
          <Edit className="size-3.5" />
          <T note="edit page" text="Edit on GitHub" />
        </>
      )}
    </a>
  );
}

/**
 * Add typography styles
 */
export function DocsBody({children, className, ...props}: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("prose flex-1", className)}>
      {children}
    </div>
  );
}

export function DocsDescription({children, className, ...props}: ComponentProps<"p">) {
  // Don't render if no description provided
  if (children === undefined) return null;

  return (
    <p
      {...props}
      className={cn("max-w-[560px] text-base leading-6 text-(--docs-fg-muted)", className)}
    >
      {children}
    </p>
  );
}

export function DocsTitle({children, className, ...props}: ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className={cn(
        "text-[30px] leading-9 font-semibold tracking-[-0.022em] text-foreground",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export {PageLastUpdate, PageBreadcrumb} from "./client";
