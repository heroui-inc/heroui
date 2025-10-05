import {buttonVariants} from "@heroui/react";
import Link from "fumadocs-core/link";

// TODO:
import {Iconify} from "@/components/iconify";
import {SocialLinks} from "@/components/social-links";
// import {ThemeBackground} from "@/components/theme-background";
import {currentVersion} from "@/utils/version";

const VersionChip = () => {
  return (
    <Link
      className="chip bg-default/50 dark:border-border hover:bg-default/40 dark:hover:bg-default/20 rounded-full dark:bg-white/10"
      href="/docs/changelog"
    >
      <Iconify className="text-muted" icon="sparkles" />
      {/* <span className="bg-gradient-to-r from-[#CA8501] to-[#BD3232] bg-clip-text text-transparent"> */}
      <span className="text-muted">v{currentVersion}: RAC Upgrade</span>
    </Link>
  );
};

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="z-10 flex flex-col items-center pt-20 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-4">
          <VersionChip />
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The design system you don&apos;t have to build
          </h1>
          <p className="text-muted text-balance text-lg">
            HeroUI is a set of beautiful, customizable, always up-to-date components that help you
            skip the copy-paste and focus on building.
          </p>
          <div className="mt-2 flex gap-3">
            <Link className={buttonVariants({class: "shadow-lg", variant: "primary"})} href="/docs">
              Explore Docs
            </Link>
            <Link
              className={buttonVariants({class: "bg-default/50", variant: "tertiary"})}
              href="/docs/components/accordion"
            >
              View Components
            </Link>
          </div>
        </div>
        {/* <HomeThemeCustomizer /> */}
      </section>
      <footer className="text-muted mt-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 py-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NextUI Inc. All rights reserved.
        </p>
        <SocialLinks />
      </footer>
    </main>
  );
}
