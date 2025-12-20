import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import Image from "next/image";

import {Footer} from "@/components/footer";
import {GitHubLink} from "@/components/github-link";
import {Iconify} from "@/components/iconify";
import {currentVersion} from "@/utils/version";

import {DemoComponents} from "./components/demo";

const VersionChip = () => {
  return (
    <LinkRoot
      className="chip rounded-full bg-surface-secondary text-xs text-muted"
      href="/docs/react/releases/v3-0-0-beta-3"
    >
      <Iconify className="size-2 text-accent/90" icon="gravity-ui:circle-fill" />
      <span>v{currentVersion}: Seven new components</span>
    </LinkRoot>
  );
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="z-10 flex flex-col items-center pt-20 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-4">
          <VersionChip />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Beautiful by default. Customizable by design.
          </h1>
          <p className="text-balance text-muted md:text-lg">
            HeroUI is the modern UI library built to help you move fast, stay consistent, and
            deliver delightful user experiences.
          </p>
          <div className="mt-2 flex gap-3">
            <LinkRoot
              className={buttonVariants({variant: "primary"})}
              href="/docs/react/components"
            >
              View components
            </LinkRoot>
            <GitHubLink>Stars</GitHubLink>
          </div>
        </div>
        {/* Mobile/Tablet: Show images */}
        <section className="mt-16 -ml-4 w-screen overflow-hidden lg:hidden lg:w-[150vw]">
          <Image
            alt="HeroUI components preview"
            className="block dark:hidden"
            fetchPriority="high"
            height={1592}
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-light.jpeg"
            width={2528}
          />
          <Image
            alt="HeroUI components preview"
            className="hidden dark:block"
            fetchPriority="high"
            height={1592}
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/home-components-dark.jpeg"
            width={2528}
          />
        </section>
        {/* Desktop: Show demos */}
        <div className="hidden lg:block">
          <DemoComponents />
        </div>
      </section>
      <Footer />
    </main>
  );
}
