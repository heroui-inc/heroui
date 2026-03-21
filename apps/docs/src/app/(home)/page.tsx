import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";

import {Footer} from "@/components/footer";
import {StarsCount} from "@/components/github-link";
import {GitHubIcon} from "@/icons/github";

import {DemoShowcase} from "./components/demo-showcase";
import {ProBadge} from "./components/pro-badge";
import {ProBanner} from "./components/pro-banner";
import {PRO_URL, SHOW_BANNER} from "./components/pro-constants";

const ProChip = () => {
  if (!SHOW_BANNER) return null;

  return (
    <a
      className="chip animate-shine relative gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs text-accent"
      href={`${PRO_URL}?utm_source=heroui.com&utm_medium=hero_chip&utm_campaign=presale`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ProBadge />
      <span className="max-w-60 truncate sm:max-w-full">Get Pro at a better price now</span>
    </a>
  );
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="z-10 flex min-h-0 flex-1 flex-col items-center px-4 pt-12 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
          <ProChip />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-4 lg:text-5xl">
            Beautiful by default. <span className="text-muted/70">Customizable by design.</span>
          </h1>
          <p className="text-balance text-muted md:text-lg">
            HeroUI is the modern UI library for web and mobile, built to help you move fast, stay
            consistent, and deliver delightful user experiences.
          </p>
          <div className="mt-4 flex gap-3">
            <LinkRoot
              className={buttonVariants({variant: "primary"})}
              href="/docs/react/getting-started"
            >
              Get started
            </LinkRoot>
            <LinkRoot
              className={buttonVariants({variant: "outline"})}
              href="/docs/react/components"
            >
              View components
            </LinkRoot>
          </div>
          <a
            className="mt-2 flex items-center justify-around gap-2 text-xs text-muted transition-colors hover:text-foreground lg:mt-4"
            href="https://github.com/heroui-inc/heroui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
            <span>
              Open source with <StarsCount className="p-0 font-normal" /> stars
            </span>
          </a>
        </div>
        <DemoShowcase />
      </section>
      <Footer />
      <ProBanner />
    </main>
  );
}
