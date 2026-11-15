import type {ReactNode} from "react";

import {ProBanner} from "@/app/[lang]/(home)/components/pro-banner";
import {DocsActions, DocsMobileActions} from "@/components/docs-shell/docs-actions";
import {FrameworksTabs} from "@/components/frameworks-tabs";
import {DocsLayout} from "@/components/fumadocs/layouts/notebook";
import {HeroUILogo} from "@/components/heroui-logo";
import {VersionSelector} from "@/components/version-selector";
import {source} from "@/lib/source";

/** The logo links to heroui.com, a separate Next.js zone, so it must stay a plain `<a>`. */
function HomeLink() {
  return (
    <a
      aria-label="HeroUI home"
      className="inline-flex shrink-0 items-center text-foreground"
      href="/"
    >
      <HeroUILogo height={22} />
    </a>
  );
}

export default async function Layout({
  children,
  params,
}: {
  params: Promise<{lang: string}>;
  children: ReactNode;
}) {
  const {lang} = await params;
  // The docs agent is English-only.
  const showAI = lang === "en";

  return (
    <>
      <DocsLayout
        actions={<DocsActions showAI={showAI} />}
        drawerFooter={<DocsActions compact className="flex-wrap" />}
        mobileActions={<DocsMobileActions showAI={showAI} />}
        mobileTitle={<HomeLink />}
        sidebar={{defaultOpenLevel: 0}}
        tree={source.getPageTree(lang)}
        sidebarHeader={
          <>
            {/* Height matches the top-right action buttons (shared center line); `ps-1` lines the logo up with the nav text. */}
            <div className="flex h-8 items-center gap-3 ps-1">
              <HomeLink />
              {/* The logo mark hangs below the wordmark, so centering leaves the version high; this sets it on the "hero" baseline. */}
              <VersionSelector className="translate-y-[3.5px]" />
            </div>
            <FrameworksTabs />
          </>
        }
      >
        {children}
      </DocsLayout>
      <ProBanner />
    </>
  );
}
