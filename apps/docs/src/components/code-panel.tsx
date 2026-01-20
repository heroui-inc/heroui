"use client";

import type {ReactNode} from "react";

import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {AnimatePresence, LazyMotion, domAnimation, m} from "motion/react";
import dynamic from "next/dynamic";
import {Suspense, useCallback} from "react";

import {Iconify} from "@/components/iconify";
import {cn} from "@/utils/cn";

// Dynamically import the highlighted code component (client-side only, with shiki)
const HighlightedCode = dynamic(
  () => import("@/components/highlighted-code").then((mod) => mod.HighlightedCode),
  {
    loading: () => <CodeLoadingSpinner />,
    ssr: false,
  },
);

function CodeLoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
    </div>
  );
}

interface CodePanelProps {
  /** Pre-rendered children (takes precedence over code prop) */
  children?: ReactNode;
  className?: string;
  /** Raw source code to highlight (used with lang prop) */
  sourceCode?: string;
  /** File name for download */
  fileName?: string;
  /** Language for syntax highlighting when using code prop */
  lang?: string;
  /** Panel title */
  title?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  isVisible: boolean;
  onClose: () => void;
}

const PANEL_ANIMATION = {
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0, x: "100%"},
  initial: {opacity: 0, x: "100%"},
  transition: {bounce: 0, duration: 0.4, type: "spring"} as const,
};

const BACKDROP_ANIMATION = {
  animate: {opacity: 1},
  exit: {opacity: 0},
  initial: {opacity: 0},
  transition: {duration: 0.3, ease: "easeOut"} as const,
};

export function CodePanel({
  children,
  className,
  fileName,
  isVisible,
  lang = "tsx",
  onClose,
  showLineNumbers = true,
  sourceCode,
  title = "Source code",
}: CodePanelProps) {
  const [copied, onCopy] = useCopyButton(() => {
    if (sourceCode) {
      void navigator.clipboard.writeText(sourceCode);
    }
  });

  const handleDownload = useCallback(() => {
    if (!sourceCode || !fileName) return;

    const blob = new Blob([sourceCode], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }, [sourceCode, fileName]);

  if (!isVisible) return null;

  // Determine what to render: children take precedence, otherwise highlight sourceCode
  const renderContent = () => {
    if (children) {
      return children;
    }

    if (sourceCode) {
      return (
        <Suspense fallback={<CodeLoadingSpinner />}>
          <HighlightedCode code={sourceCode} lang={lang} showLineNumbers={showLineNumbers} />
        </Suspense>
      );
    }

    return null;
  };

  return (
    <LazyMotion strict features={domAnimation}>
      <AnimatePresence>
        {/* Backdrop overlay */}
        <m.div
          key="code-panel-backdrop"
          aria-label="Close source code"
          className="fixed inset-0 z-9999 bg-black/40 backdrop-blur-sm"
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          {...BACKDROP_ANIMATION}
        />

        {/* Code panel */}
        <m.aside
          key="code-panel"
          aria-label={title}
          className={cn(
            "fixed top-1/2 right-6 z-9999 flex h-[88vh] w-[45%] -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-surface/94 shadow-xl backdrop-blur-md",
            className,
          )}
          {...PANEL_ANIMATION}
        >
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between border-b border-separator/50 px-6 py-3">
            <h3 className="text-sm font-medium text-foreground/60">{title}</h3>
            <div className="flex items-center gap-1">
              {!!sourceCode && !!fileName && (
                <button
                  aria-label="Download code"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground/60"
                  type="button"
                  onClick={handleDownload}
                >
                  <Iconify icon="arrow-down-to-line" width={16} />
                </button>
              )}
              {!!sourceCode && (
                <button
                  aria-label={copied ? "Copied!" : "Copy code"}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground/60 data-[copied=true]:text-green-500"
                  data-copied={copied || undefined}
                  type="button"
                  onClick={onCopy}
                >
                  <Iconify icon={copied ? "check" : "copy"} width={16} />
                </button>
              )}
            </div>
          </header>

          {/* Code content */}
          <div className="flex-1 overflow-auto px-4 py-2">{renderContent()}</div>
        </m.aside>
      </AnimatePresence>
    </LazyMotion>
  );
}
