import type {LayoutHeaderTabsProps} from "./client";
import type {LinkItemType} from "@/components/fumadocs/ui/link-item";
import type * as PageTree from "fumadocs-core/page-tree";
import type {SidebarPageTreeComponents} from "fumadocs-ui/components/sidebar/page-tree";
import type {SidebarTabWithProps} from "fumadocs-ui/components/sidebar/tabs/dropdown";
import type {GetSidebarTabsOptions} from "fumadocs-ui/components/sidebar/tabs/index";
import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";
import type {ComponentProps, FC, HTMLAttributes, ReactNode} from "react";

import Link from "fumadocs-core/link";
import {getSidebarTabs} from "fumadocs-ui/components/sidebar/tabs/index";
import {buttonVariants} from "fumadocs-ui/components/ui/button";
import {TreeContextProvider} from "fumadocs-ui/contexts/tree";
import {resolveLinkItems} from "fumadocs-ui/layouts/shared";
import {useMemo} from "react";

import {Languages, Sidebar as SidebarIcon, X} from "@/components/fumadocs/ui/icons";
import {LanguageToggle} from "@/components/fumadocs/ui/language-toggle";
import {LinkItem} from "@/components/fumadocs/ui/link-item";
import {LargeSearchToggle, SearchToggle} from "@/components/fumadocs/ui/search-toggle";
import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";
import {cn} from "@/utils/cn";

import {
  FilteredSidebarTabsDropdown,
  LayoutBody,
  LayoutContextProvider,
  LayoutHeader,
  LayoutHeaderTabs,
  NavbarLinkItem,
} from "./client";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarDrawer,
  SidebarLinkItem,
  SidebarPageTree,
  SidebarTrigger,
  SidebarViewport,
} from "./sidebar";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabMode?: "sidebar" | "navbar";

  nav?: BaseLayoutProps["nav"] & {
    mode?: "top" | "auto";
    titleSuffix?: ReactNode;
    titleSuffixGap?: string;
  };

  sidebar?: SidebarOptions;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

interface SidebarOptions
  extends
    ComponentProps<"aside">,
    Pick<ComponentProps<typeof Sidebar>, "defaultOpenLevel" | "prefetch"> {
  components?: Partial<SidebarPageTreeComponents>;

  /**
   * Root Toggle options
   */
  tabs?: SidebarTabWithProps[] | GetSidebarTabsOptions | false;

  headerTabsProps?: LayoutHeaderTabsProps;

  banner?: ReactNode | FC<ComponentProps<"div">>;
  footer?: ReactNode | FC<ComponentProps<"div">>;

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean;
}

export function DocsLayout(props: DocsLayoutProps) {
  const {
    i18n = false,
    nav = {},
    sidebar: {defaultOpenLevel, headerTabsProps, prefetch, tabs: tabOptions, ...sidebarProps} = {},
    tabMode = "sidebar",
    themeSwitch = {},
    tree,
  } = props;

  const navMode = nav.mode ?? "auto";
  const links = resolveLinkItems(props);
  const tabs = useMemo(() => {
    if (Array.isArray(tabOptions)) {
      return tabOptions;
    }

    if (typeof tabOptions === "object") {
      return getSidebarTabs(tree, tabOptions);
    }

    if (tabOptions !== false) {
      return getSidebarTabs(tree);
    }

    return [];
  }, [tabOptions, tree]);

  function sidebar() {
    const {banner, collapsible = true, components, footer, ...rest} = sidebarProps;

    const iconLinks = links.filter((item) => item.type === "icon");
    const Header =
      typeof banner === "function"
        ? banner
        : ({className, ...props}: ComponentProps<"div">) => (
            <div className={cn("flex flex-col gap-3 p-4 pb-2 empty:hidden", className)} {...props}>
              {props.children}
              {banner}
            </div>
          );
    const Footer =
      typeof footer === "function"
        ? footer
        : ({className, ...props}: ComponentProps<"div">) => (
            <div
              className={cn(
                "text-fd-muted-foreground hidden flex-row items-center border-t p-4 pt-2",
                iconLinks.length > 0 && "max-lg:flex",
                className,
              )}
              {...props}
            >
              {props.children}
              {footer}
            </div>
          );
    const viewport = (
      <SidebarViewport>
        {links
          .filter((item) => item.type !== "icon")
          .map((item, i, arr) => (
            <SidebarLinkItem
              key={i}
              className={cn("lg:hidden", i === arr.length - 1 && "mb-4")}
              item={item}
            />
          ))}

        <SidebarPageTree {...components} />
      </SidebarViewport>
    );

    return (
      <>
        <SidebarContent {...rest}>
          <Header>
            {navMode === "auto" && (
              <div className="flex justify-between">
                {nav.titleSuffix ? (
                  <div className={cn("flex items-center", nav.titleSuffixGap ?? "gap-4")}>
                    <Link
                      className="inline-flex items-center gap-2.5 font-medium"
                      href={nav.url ?? "/"}
                    >
                      {nav.title}
                    </Link>
                    {nav.titleSuffix}
                  </div>
                ) : (
                  <Link
                    className="inline-flex items-center gap-2.5 font-medium"
                    href={nav.url ?? "/"}
                  >
                    {nav.title}
                  </Link>
                )}
                {!!collapsible && (
                  <SidebarCollapseTrigger
                    className={cn(
                      buttonVariants({
                        className: "text-fd-muted-foreground mt-px mb-auto",
                        color: "ghost",
                        size: "icon-sm",
                      }),
                    )}
                  >
                    <SidebarIcon />
                  </SidebarCollapseTrigger>
                )}
              </div>
            )}
            {nav.children}
            {tabs.length > 0 && (
              <FilteredSidebarTabsDropdown
                className={cn(tabMode === "navbar" && "lg:hidden")}
                options={tabs}
              />
            )}
          </Header>
          {viewport}
          <Footer>
            {iconLinks.map((item, i) => (
              <LinkItem
                key={i}
                aria-label={item.label}
                item={item}
                className={cn(
                  buttonVariants({
                    className: "lg:hidden",
                    color: "ghost",
                    size: "icon-sm",
                  }),
                )}
              >
                {item.icon}
              </LinkItem>
            ))}
          </Footer>
        </SidebarContent>
        <SidebarDrawer {...rest}>
          <Header>
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  className: "text-fd-muted-foreground ms-auto",
                  color: "ghost",
                  size: "icon-sm",
                }),
              )}
            >
              <X />
            </SidebarTrigger>
            {tabs.length > 0 && <FilteredSidebarTabsDropdown options={tabs} />}
          </Header>
          {viewport}
          <Footer
            className={cn(
              "hidden flex-row items-center justify-end",
              (i18n || themeSwitch.enabled !== false) && "flex",
              iconLinks.length > 0 && "max-lg:flex",
            )}
          >
            {iconLinks.map((item, i) => (
              <LinkItem
                key={i}
                aria-label={item.label}
                item={item}
                className={cn(
                  buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                  }),
                  "text-fd-muted-foreground lg:hidden",
                  i === iconLinks.length - 1 && "me-auto",
                )}
              >
                {item.icon}
              </LinkItem>
            ))}
            {!!i18n && (
              <LanguageToggle>
                <Languages className="text-fd-muted-foreground size-4.5" />
              </LanguageToggle>
            )}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
              ))}
          </Footer>
        </SidebarDrawer>
      </>
    );
  }

  return (
    <TreeContextProvider tree={tree}>
      <LayoutContextProvider
        navMode={nav.mode ?? "auto"}
        navTransparentMode={nav.transparentMode}
        tabMode={tabMode}
      >
        <Sidebar defaultOpenLevel={defaultOpenLevel} prefetch={prefetch}>
          <LayoutBody {...props.containerProps}>
            {sidebar()}
            <DocsNavbar {...props} headerTabsProps={headerTabsProps} links={links} tabs={tabs} />
            {props.children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}

function DocsNavbar({
  headerTabsProps,
  i18n,
  links,
  nav = {},
  searchToggle = {},
  sidebar: {collapsible: sidebarCollapsible = true} = {},
  tabMode = "sidebar",
  tabs,
  themeSwitch = {},
}: DocsLayoutProps & {
  headerTabsProps?: LayoutHeaderTabsProps;
  links: LinkItemType[];
  tabs: SidebarTabWithProps[];
}) {
  const navMode = nav.mode ?? "auto";
  const showLayoutTabs = tabMode === "navbar" && tabs.length > 0;

  return (
    <LayoutHeader
      id="nd-subnav"
      className={cn(
        "data-[transparent=false]:bg-fd-background/80 layout:[--fd-header-height:--spacing(23)] sticky top-(--fd-docs-row-1) z-10 flex flex-col backdrop-blur-sm transition-colors [grid-area:header]",
        showLayoutTabs && "md:layout:[--fd-header-height:--spacing(25)]",
      )}
    >
      <div className="flex h-14 gap-2 border-b px-4 md:px-6" data-header-body="">
        <div
          className={cn(
            "items-center",
            navMode === "top" && "flex flex-1",
            navMode === "auto" && "hidden max-md:flex has-data-[collapsed=true]:md:flex",
          )}
        >
          {!!sidebarCollapsible && navMode === "auto" && (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: "ghost",
                  size: "icon-sm",
                }),
                "text-fd-muted-foreground data-[collapsed=false]:hidden max-md:hidden",
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          )}
          {nav.titleSuffix ? (
            <div className={cn("flex items-center", nav.titleSuffixGap ?? "gap-4")}>
              <Link
                href={nav.url ?? "/"}
                className={cn(
                  "inline-flex items-center gap-2.5 font-semibold",
                  navMode === "auto" && "md:hidden",
                )}
              >
                {nav.title}
              </Link>
              {nav.titleSuffix}
            </div>
          ) : (
            <Link
              href={nav.url ?? "/"}
              className={cn(
                "inline-flex items-center gap-2.5 font-semibold",
                navMode === "auto" && "md:hidden",
              )}
            >
              {nav.title}
            </Link>
          )}
        </div>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ? (
            <div
              className={cn(
                "my-auto w-full max-md:hidden",
                navMode === "top" ? "max-w-sm rounded-xl" : "max-w-[240px]",
              )}
            >
              {searchToggle.components.lg}
            </div>
          ) : (
            <LargeSearchToggle
              hideIfDisabled
              className={cn(
                "my-auto w-full max-md:hidden",
                navMode === "top" ? "max-w-sm rounded-xl ps-2.5" : "max-w-[240px]",
              )}
            />
          ))}
        <div className="flex flex-1 items-center justify-end md:gap-2">
          <div className="flex items-center gap-6 empty:hidden max-lg:hidden">
            {links
              .filter((item) => item.type !== "icon")
              .map((item, i) => (
                <NavbarLinkItem key={i} item={item} />
              ))}
          </div>
          {nav.children}
          {links
            .filter((item) => item.type === "icon")
            .map((item, i) => (
              <LinkItem
                key={i}
                aria-label={item.label}
                item={item}
                className={cn(
                  buttonVariants({color: "ghost", size: "icon-sm"}),
                  "text-fd-muted-foreground max-lg:hidden",
                )}
              >
                {item.icon}
              </LinkItem>
            ))}

          <div className="flex items-center md:hidden">
            {searchToggle.enabled !== false &&
              (searchToggle.components?.sm ?? <SearchToggle hideIfDisabled className="p-2" />)}
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  className: "-me-1.5 p-2",
                  color: "ghost",
                  size: "icon-sm",
                }),
              )}
            >
              <SidebarIcon />
            </SidebarTrigger>
          </div>

          <div className="flex items-center gap-2 max-md:hidden">
            {!!i18n && (
              <LanguageToggle>
                <Languages className="text-fd-muted-foreground size-4.5" />
              </LanguageToggle>
            )}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
              ))}
            {!!sidebarCollapsible && navMode === "top" && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    color: "secondary",
                    size: "icon-sm",
                  }),
                  "text-fd-muted-foreground -me-1.5 rounded-full",
                )}
              >
                <SidebarIcon />
              </SidebarCollapseTrigger>
            )}
          </div>
        </div>
      </div>
      {!!showLayoutTabs && (
        <LayoutHeaderTabs
          className={cn("h-10 overflow-x-auto border-b px-6", headerTabsProps?.className)}
          data-header-tabs=""
          {...headerTabsProps}
          options={tabs}
        />
      )}
    </LayoutHeader>
  );
}
