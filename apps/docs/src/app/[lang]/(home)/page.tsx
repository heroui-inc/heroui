import type {Metadata} from "next";

import {ArrowRight} from "@gravity-ui/icons";
import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import {notFound} from "next/navigation";

import {Footer} from "@/components/footer";
import {siteConfig} from "@/config/site";
import {getDictionary, hasLocale} from "@/lib/dictionaries";
import {i18n} from "@/lib/i18n";
import {absoluteUrl, getLocalizedAlternates} from "@/lib/seo";

import {DemoShowcase} from "./components/demo-showcase";
import {ProBanner} from "./components/pro-banner";
import {ReleaseBadges} from "./components/release-badges";

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({lang}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>;
}): Promise<Metadata> {
  const {lang} = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const alternates = getLocalizedAlternates({locale});
  const {metaDescription: description, metaTitle: title} = dict.home;
  const url = absoluteUrl(alternates.canonical);

  return {
    alternates,
    description,
    openGraph: {
      description,
      images: [{alt: title, url: siteConfig.ogImage}],
      locale: locale === "cn" ? "zh_CN" : "en_US",
      siteName: siteConfig.name,
      title,
      type: "website",
      url,
    },
    title: {absolute: title},
    twitter: {
      card: "summary_large_image",
      creator: "@hero_ui",
      description,
      images: [siteConfig.ogImage],
      site: "@hero_ui",
      title,
    },
  };
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
          <ReleaseBadges badges={home.releaseBadges} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-5 lg:text-[56px] lg:leading-[60px] lg:tracking-[-0.03em]">
            {home.titleMain} <span className="block text-muted/70">{home.titleMuted}</span>
          </h1>
          <p className="mt-4 max-w-[600px] text-balance text-muted md:text-lg lg:mt-5">
            {home.description}
          </p>
          <div className="mt-6 flex gap-3 lg:mt-8">
            <LinkRoot
              href="/docs/react/getting-started"
              className={buttonVariants({
                className: "ps-5 pe-4 text-sm",
                size: "lg",
                variant: "primary",
              })}
            >
              {home.getStarted}
              <ArrowRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
            </LinkRoot>
            <LinkRoot
              href="/docs/react/components"
              className={buttonVariants({
                className: "px-5 text-sm",
                size: "lg",
                variant: "outline",
              })}
            >
              {home.viewComponents}
            </LinkRoot>
          </div>
          <section
            aria-labelledby="heroui-overview"
            className="sr-only"
            lang={lang === "cn" ? "en" : undefined}
          >
            <h2 id="heroui-overview">Build accessible products with HeroUI</h2>
            <p>
              HeroUI is an open-source component library for React web and React Native
              applications. The web library combines React Aria Components with Tailwind CSS v4 to
              provide accessible behavior, typed APIs, customizable composition, and polished
              defaults. Teams can inspect the source, use the free packages, and adapt each
              component to their own design system.
            </p>
            <h3>Documentation for developers and coding agents</h3>
            <p>
              The HeroUI documentation includes installation guides, component APIs, examples,
              theming references, migration instructions, and an official CLI guide. Coding agents
              can use the generated llms.txt indexes, request documentation as markdown, search the
              public Docs Agent API, read its OpenAPI specification, or connect the existing HeroUI
              React and HeroUI Native MCP packages. These machine-readable resources expose the same
              public documentation without requiring a paid plan or weakening authentication for
              private services.
            </p>
          </section>
        </div>
        <DemoShowcase />
      </section>
      <Footer dict={dict.footer} />
      <ProBanner />
    </main>
  );
}
