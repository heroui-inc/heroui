import fs from "node:fs/promises";
import path from "node:path";

import {notFound} from "next/navigation";

import {ShowcaseSource} from "@/components/showcase-source";
import {getAllShowcases, getShowcase} from "@/showcases";

import {ShowcaseCodePanel} from "./showcase-code-panel";
import {ShowcaseDetailClient} from "./showcase-detail-client";
import {ShowcaseWrapper} from "./showcase-wrapper";

interface ShowcasePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Force static rendering for showcase pages
export const dynamic = "force-static";

export async function generateStaticParams() {
  const showcases = getAllShowcases();

  return showcases.map((showcase) => ({
    id: showcase.name,
  }));
}

export default async function ShowcasePage({params}: ShowcasePageProps) {
  const {id} = await params;
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
