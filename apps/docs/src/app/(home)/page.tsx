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
      className="text-foreground/50 chip bg-surface shadow-surface rounded-full text-xs"
      href="/docs/changelog"
    >
      <Iconify icon="sparkles" />
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
          <p className="text-muted text-balance md:text-lg">
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
        {/* Mobile/Tablet: Show images */}
        <section className="-ml-4 mt-16 w-[100vw] overflow-hidden lg:hidden lg:w-[150vw]">
          <picture>
            <source
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              type="image/jpeg"
              srcSet="
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-light_0.25x.jpeg 640w,
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-light_0.5x.jpeg 1280w,
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-light.jpeg 2528w
              "
            />
            <img
              alt="HeroUI components preview"
              className="block dark:hidden"
              decoding="async"
              height="1592"
              loading="lazy"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-light.jpeg"
              width="2528"
            />
          </picture>
          <picture>
            <source
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              type="image/jpeg"
              srcSet="
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-dark_0.25x.jpeg 640w,
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-dark_0.5x.jpeg 1280w,
                https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-dark.jpeg 2528w
              "
            />
            <img
              alt="HeroUI components preview"
              className="hidden dark:block"
              decoding="async"
              height="1592"
              loading="lazy"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-dark.jpeg"
              width="2528"
            />
          </picture>
        </section>
        {/* Desktop: Show demos */}
        <div className="hidden lg:block">
          <DemoComponents />
        </div>
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
