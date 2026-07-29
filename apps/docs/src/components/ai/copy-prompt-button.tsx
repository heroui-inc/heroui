"use client";

import {Button} from "@heroui/react";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import Image from "next/image";

import {useDictionary} from "@/hooks/use-dictionary";

/**
 * Props for the {@link CopyPromptButton} component.
 */
interface CopyPromptButtonProps {
  /**
   * The prompt text written to the clipboard when the user clicks the button.
   * Multi-line strings are supported.
   */
  prompt: string;
}

/**
 * CopyPromptButton
 *
 * A compact header action that copies an AI setup prompt to the clipboard so
 * users can paste it into their AI assistant. Rendered next to `ViewOptions`
 * in the docs page header.
 *
 * This is a client component because clipboard access and the "Copied" toggle
 * state from `useCopyButton` must run in the browser.
 */
export function CopyPromptButton({prompt}: CopyPromptButtonProps) {
  const dict = useDictionary().copyPrompt;
  const [checked, onClick] = useCopyButton(() => {
    void navigator.clipboard.writeText(prompt);
  });

  return (
    <Button
      aria-label={checked ? dict.ariaLabelCopied : dict.ariaLabelCopy}
      size="md"
      type="button"
      variant="tertiary"
      onClick={onClick}
    >
      <span aria-hidden="true" className="flex items-center">
        {["/images/mcp-cursor.png", "/images/mcp-claude.png", "/images/mcp-openai.png"].map(
          (src, i) => (
            <Image
              key={src}
              alt=""
              className="size-5 shrink-0 rounded-full border border-white/25 object-cover"
              height={20}
              src={src}
              style={{marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i}}
              width={20}
            />
          ),
        )}
      </span>
      {checked ? dict.copied : dict.copy}
    </Button>
  );
}
