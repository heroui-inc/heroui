"use client";

import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {AnimatePresence, LazyMotion, domAnimation, m} from "motion/react";
import * as React from "react";

import {Iconify} from "@/components/iconify";
import {cn} from "@/utils/cn";

import {useShowcase} from "./showcase-wrapper";

// For even smaller bundle size, you can use async loading:
// const loadFeatures = () =>
//   import("motion/react-dom").then((res) => res.domAnimation);

interface ShowcaseCodePanelProps {
  children: React.ReactNode;
  className?: string;
  sourceCode?: string;
  showcaseName?: string;
}

export function ShowcaseCodePanel({
  children,
  className,
  showcaseName,
  sourceCode,
}: ShowcaseCodePanelProps) {
  const {isCodeVisible, toggleCode} = useShowcase();
  const [copied, onCopy] = useCopyButton(async () => {
    if (sourceCode) {
      await navigator.clipboard.writeText(sourceCode);
    }
  });

  const handleDownload = () => {
    if (!sourceCode || !showcaseName) return;

    // Create a blob with the source code
    const blob = new Blob([sourceCode], {type: "text/typescript"});
    const url = URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement("a");

    a.href = url;
    a.download = `${showcaseName}.tsx`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <LazyMotion strict features={domAnimation}>
      <AnimatePresence>
        {!!isCodeVisible && (
          <>
            {/* Backdrop overlay */}
            <m.div
              animate={{opacity: 1}}
              aria-label="Close source code"
              className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              transition={{duration: 0.3, ease: "easeOut"}}
              onClick={toggleCode}
            />
            {/* Code panel */}
            <m.div
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: "100%"}}
              initial={{opacity: 0, x: "100%"}}
              transition={{bounce: 0, duration: 0.4, type: "spring"}}
              className={cn(
                "bg-surface-2/94 absolute right-6 z-[9999] h-full max-h-[88%] w-[45%] overflow-hidden rounded-xl shadow-xl backdrop-blur-md",
                className,
              )}
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3">
                  <h3 className="text-foreground/60 text-sm font-medium">Source code</h3>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Download code"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/60"
                      onClick={handleDownload}
                    >
                      <Iconify icon="arrow-down-to-line" width={16} />
                    </button>
                    <button
                      aria-label="Copy code"
                      className="text-foreground/40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-white/5 hover:text-white/60 data-[copied=true]:text-green-400"
                      data-copied={copied}
                      onClick={onCopy}
                    >
                      <Iconify icon={copied ? "check" : "copy"} width={16} />
                    </button>
                  </div>
                </div>
                {/* Code content */}
                <div className="h-full flex-1 overflow-auto">
                  <div className="min-h-full px-4">{children}</div>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
