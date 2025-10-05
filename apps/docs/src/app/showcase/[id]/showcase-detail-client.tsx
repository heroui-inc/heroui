"use client";

import type {ShowcaseItem as ShowcaseItemType} from "@/showcases";

import {chipVariants} from "@heroui/react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import {tv} from "tailwind-variants";

import {ShowcaseItem} from "@/components/showcase-item";
import {ShowcasePreview} from "@/components/showcase-preview";
import {getAllShowcases} from "@/showcases";

import {ShowcaseHeader} from "./showcase-header";

const dotBackground = tv({
  base: [
    "pointer-events-none absolute inset-0 z-[0] h-full w-full bg-transparent [background-size:16px_16px]",
    // light
    "bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#ffffff_60%,transparent_100%)]",
    // dark
    "dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] dark:[mask-image:radial-gradient(ellipse_100%_54%_at_50%_50%,#000_60%,transparent_100%)]",
  ],
});

interface ShowcaseDetailClientProps {
  showcaseId: string;
  showcase: ShowcaseItemType & {category: string};
  codePanel: React.ReactNode;
}

function ShowcasesList({showcaseId}: {showcaseId: string}) {
  const searchParams = useSearchParams();
  const allShowcases = getAllShowcases();
  const returnUrl = searchParams.get("returnUrl");
  const queryString = returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : "";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
      {allShowcases.map((item) => (
        <ShowcaseItem
          key={item.name}
          isMinimal
          aria-label={item.title}
          href={`/showcase/${item.name}${queryString}`}
          isSelected={item.name === showcaseId}
          item={item}
        />
      ))}
    </div>
  );
}

export function ShowcaseDetailClient({codePanel, showcase, showcaseId}: ShowcaseDetailClientProps) {
  return (
    <section className="bg-background text-foreground relative flex min-h-screen w-screen flex-col overflow-hidden">
      <div aria-hidden="true" className={dotBackground()} />

      {/* Header */}
      <Suspense fallback={null}>
        <ShowcaseHeader />
      </Suspense>

      {/* Main content - horizontal layout */}
      <main className="z-[1] flex flex-1 flex-col">
        <div className="flex flex-1">
          {/* Preview Section */}
          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <div className="flex h-full max-h-full w-full max-w-5xl flex-col items-center justify-center">
              <ShowcasePreview fullWidth name={showcaseId} />
            </div>
            {codePanel}
          </div>

          {/* Showcase List Section - Right Side */}
          <div className="hidden w-24 md:block">
            <Suspense fallback={null}>
              <ShowcasesList showcaseId={showcaseId} />
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-border/50 bg-background/50 z-[1] border-t backdrop-blur-sm">
          <div className="jutify-center mx-auto flex max-w-7xl flex-col flex-wrap items-center px-6 py-4 md:flex-row md:flex-nowrap md:justify-between">
            {/* Left section - Author info */}
            <div className="order-2 flex-1 md:order-1">
              <p className="text-muted/70 text-center text-sm md:text-left">
                By{" "}
                {showcase.author?.link ? (
                  <a
                    className="hover:text-muted transition-colors"
                    href={showcase.author?.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {showcase.author.name} <span>@{showcase.author.username}</span>
                  </a>
                ) : (
                  <>
                    {showcase.author?.name} <span>@{showcase.author?.username}</span>
                  </>
                )}
              </p>
            </div>

            {/* Center - Show used components */}
            <div className="order-1 my-2 flex flex-1 items-center justify-center gap-2 md:order-2 md:my-0">
              {showcase.components.map((component) => (
                <Link
                  key={component}
                  href={`/docs/components/${component.toLowerCase().replace(/group$/, "-group")}`}
                  className={chipVariants({
                    class: "text-muted hover:bg-default/50 rounded-full",
                    variant: "tertiary",
                  })}
                >
                  {component}
                </Link>
              ))}
            </div>

            <div className="order-3 flex-1 text-center md:text-right">
              <p className="text-muted/70 text-sm">{showcase.title}</p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
}
