import type {Metadata} from "next";

import fs from "node:fs/promises";
import path from "node:path";

import {notFound} from "next/navigation";

import {ShowcaseSource} from "@/components/showcase-source";
import {hasLocale} from "@/lib/dictionaries";
import {i18n} from "@/lib/i18n";
import {getAllShowcases, getShowcase} from "@/showcases";

import {ShowcaseCodePanel} from "./showcase-code-panel";
import {ShowcaseDetailClient} from "./showcase-detail-client";
import {ShowcaseWrapper} from "./showcase-wrapper";

interface ShowcasePageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

// Force static rendering for showcase pages
export const dynamic = "force-static";

export async function generateMetadata({params}: ShowcasePageProps): Promise<Metadata> {
  const {id, lang} = await params;
  const showcase = getShowcase(id);

  if (!showcase) return {};

  return {
    alternates: {
      canonical: `/${lang}/showcase/${id}`,
    },
    description: `Interactive demo of ${showcase.name} built with HeroUI components.`,
    openGraph: {
      description: `Interactive demo of ${showcase.name} built with HeroUI components.`,
      title: `${showcase.name} - HeroUI Showcase`,
      url: `/${lang}/showcase/${id}`,
    },
    title: `${showcase.name} - HeroUI Showcase`,
  };
}

export async function generateStaticParams() {
  const showcases = getAllShowcases();

  return i18n.languages.flatMap((lang) =>
    showcases.map((showcase) => ({
      id: showcase.name,
      lang,
    })),
  );
}

export default async function ShowcasePage({params}: ShowcasePageProps) {
  const {id, lang} = await params;

  if (!hasLocale(lang)) notFound();

  const showcase = getShowcase(id);

  if (!showcase) {
    notFound();
  }

  // Get the source code for the showcase
  let sourceCode = "";

  if (showcase.file && showcase.category) {
    try {
      const category = showcase.category.toLowerCase();
      const filePath = path.join(process.cwd(), "src", "showcases", category, showcase.file);

      sourceCode = await fs.readFile(filePath, "utf-8");
    } catch (error) {
      console.error("Failed to read showcase file:", error);
    }
  }

  const codePanel = (
    <ShowcaseCodePanel fileName={`${id}.tsx`} sourceCode={sourceCode}>
      <ShowcaseSource showLineNumbers allowCopy={false} language="tsx" name={id} />
    </ShowcaseCodePanel>
  );

  return (
    <ShowcaseWrapper
      defaultTheme={showcase.defaultTheme}
      supportsThemeSwitching={showcase.supportsThemeSwitching}
    >
      <ShowcaseDetailClient codePanel={codePanel} showcase={showcase} showcaseId={id} />
    </ShowcaseWrapper>
  );
}
