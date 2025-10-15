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
      className="chip bg-pink-400/8 hover:bg-default/40 rounded-full border-pink-400/20 dark:border-pink-400/10 dark:bg-white/10 dark:hover:bg-pink-400/20"
      href="/docs/changelog"
    >
      <Iconify className="text-pink-400/90" icon="sparkles" />
      {/* <span className="bg-gradient-to-r from-[#CA8501] to-[#BD3232] bg-clip-text text-transparent"> */}
      <span className="text-pink-400/90">v{currentVersion}: Form Components</span>
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
