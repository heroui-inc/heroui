"use client";

import type {BundledLanguage, BundledTheme, HighlighterGeneric} from "shiki";

import {useTheme} from "next-themes";
import {memo, use, useMemo} from "react";

import {cn} from "@/utils/cn";

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

// Singleton highlighter promise
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighterPromise(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({createHighlighter}) =>
      createHighlighter({
        langs: ["tsx", "typescript", "javascript", "jsx", "css", "html", "json", "bash", "shell"],
        themes: ["github-dark", "github-light"],
      }),
    );
  }

  return highlighterPromise;
}

interface HighlightedCodeProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
}

/**
 * HighlightedCode component for syntax highlighting using Shiki.
 *
 * This component is memoized with React.memo() to work effectively with
 * useDeferredValue for performance optimization. When parent components
 * use useDeferredValue on the code prop, memoization ensures this expensive
 * syntax highlighting only re-runs when the deferred value actually changes.
 */
export const HighlightedCode = memo(function HighlightedCode({
  className,
  code,
  lang = "tsx",
  showLineNumbers = true,
}: HighlightedCodeProps) {
  const {resolvedTheme} = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  // Use React's `use` hook to suspend while loading the highlighter
  const highlighter = use(getHighlighterPromise());

  const highlightedHtml = useMemo(() => {
    const trimmedCode = code.trim();

    if (!trimmedCode) return "";

    const loadedLangs = highlighter.getLoadedLanguages();
    const langToUse = loadedLangs.includes(lang as BundledLanguage) ? lang : "text";

    return highlighter.codeToHtml(trimmedCode, {
      lang: langToUse,
      theme: theme === "dark" ? "github-dark" : "github-light",
    });
  }, [code, lang, theme, highlighter]);

  if (!highlightedHtml) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{__html: highlightedHtml}}
      className={cn(
        "docs-code-block overflow-auto text-sm [&_.shiki]:bg-transparent! [&_pre]:bg-transparent!",
        showLineNumbers && "docs-code-block-line-numbers",
        "[&>pre]:m-0 [&>pre]:p-4",
        "[&>pre>code]:block [&>pre>code]:font-mono [&>pre>code]:leading-relaxed",
        className,
      )}
    />
  );
});
