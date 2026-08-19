import type {Metadata} from "next";
import type {ReactNode} from "react";

import {notFound} from "next/navigation";

import {siteConfig} from "@/config/site";
import {getDictionary, hasLocale} from "@/lib/dictionaries";
import {absoluteUrl, getLocalizedAlternates} from "@/lib/seo";

// The showcase index itself is a client component, so its metadata is declared
// here — without it the page would inherit the root layout's canonical.
export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>;
}): Promise<Metadata> {
  const {lang} = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : await getDictionary("en");
  const alternates = getLocalizedAlternates({locale: lang, path: "/showcase"});

  return {
    alternates,
    description: dict.showcase.description,
    openGraph: {
      description: dict.showcase.description,
      images: [{alt: dict.showcase.heading, url: siteConfig.ogImage}],
      locale: lang === "cn" ? "zh_CN" : "en_US",
      siteName: siteConfig.name,
      title: dict.showcase.heading,
      type: "website",
      url: absoluteUrl(alternates.canonical),
    },
    title: dict.showcase.heading,
  };
}

export default async function ShowcaseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const {showcase} = dict;

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-[68rem]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{showcase.heading}</h1>
        <p className="mb-12 text-lg font-light text-muted">{showcase.description}</p>
        {children}
      </div>
    </main>
  );
}
