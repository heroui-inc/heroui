import {Rocket} from "@gravity-ui/icons";
import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import {notFound} from "next/navigation";

import {Footer} from "@/components/footer";
import {StarsCount} from "@/components/github-link";
import {GitHubIcon} from "@/icons/github";
import {getDictionary, hasLocale} from "@/lib/dictionaries";
import {i18n} from "@/lib/i18n";

import {DemoShowcase} from "./components/demo-showcase";
import {ProBanner} from "./components/pro-banner";

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({lang}));
}

export default async function HomePage({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const {home} = dict;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      <section className="z-10 flex min-h-0 flex-1 flex-col items-center px-4 pt-12 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
          <LinkRoot
            className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-xs text-accent-soft-foreground transition-colors hover:bg-accent-soft-hover"
            href="/docs/native/releases/create-heroui-native-app"
          >
            <Rocket className="size-3 text-accent-soft-foreground" />
            <span className="max-w-60 truncate sm:max-w-full">{home.releaseBadge}</span>
          </LinkRoot>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-4 lg:text-5xl">
            {home.titleMain} <div className="text-muted/70">{home.titleMuted}</div>
          </h1>
          <p className="text-balance text-muted md:text-lg">{home.description}</p>
          <div className="mt-4 flex gap-3">
            <LinkRoot
              className={buttonVariants({variant: "primary"})}
              href="/docs/react/getting-started"
            >
              {home.getStarted}
            </LinkRoot>
            <LinkRoot
              className={buttonVariants({variant: "outline"})}
              href="/docs/react/components"
            >
              {home.viewComponents}
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
              {home.githubStarsPrefix} <StarsCount className="p-0 font-normal" />{" "}
              {home.githubStarsSuffix}
            </span>
          </a>
        </div>
        <DemoShowcase />
      </section>
      <Footer dict={dict.footer} />
      <ProBanner />
    </main>
  );
}
