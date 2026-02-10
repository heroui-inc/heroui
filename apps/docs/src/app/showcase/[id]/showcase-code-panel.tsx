"use client";

import type {ReactNode} from "react";

import {CodePanel} from "@/components/code-panel";
import {useCodePanel} from "@/hooks/use-code-panel";

interface ShowcaseCodePanelProps {
  children: ReactNode;
  className?: string;
  sourceCode?: string;
  fileName?: string;
}

export function ShowcaseCodePanel({
  children,
  className,
  fileName,
  sourceCode,
}: ShowcaseCodePanelProps) {
  const {isCodeVisible, toggleCode} = useCodePanel();

  return (
    <CodePanel
      className={className}
      fileName={fileName}
      isVisible={isCodeVisible}
      sourceCode={sourceCode}
      title="Source code"
      onClose={toggleCode}
    >
      {children}
    </CodePanel>
  );
}
