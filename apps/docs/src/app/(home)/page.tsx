import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";

// TODO:
import {GitHubLink} from "@/components/github-link";
import {Iconify} from "@/components/iconify";
import {SocialLinks} from "@/components/social-links";
// import {ThemeBackground} from "@/components/theme-background";
import {currentVersion} from "@/utils/version";

import {DemoComponents} from "./components/demo";

const VersionChip = () => {
  return (
    <LinkRoot
      className="text-foreground/50 chip bg-surface shadow-surface rounded-full"
      href="/docs/changelog"
    >
      <Iconify icon="sparkles" />
      {/* <span className="bg-gradient-to-r from-[#CA8501] to-[#BD3232] bg-clip-text text-transparent"> */}
      <span>v{currentVersion}: RSC Support</span>
    </LinkRoot>
  );
};

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="z-10 flex flex-col items-center pt-20 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-4">
          <VersionChip />
          <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Beautiful by default. Customizable by design.
          </h1>
          <p className="text-muted text-balance text-lg">
            HeroUI is the modern UI library built to help you move fast, stay consistent, and
            deliver delightful user experiences.
          </p>
          <div className="mt-2 flex gap-3">
            <LinkRoot
              className={buttonVariants({variant: "primary"})}
              href="/docs/components/accordion"
            >
              View components
            </LinkRoot>
            <GitHubLink>Stars</GitHubLink>
          </div>
        </div>
        <DemoComponents />
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
