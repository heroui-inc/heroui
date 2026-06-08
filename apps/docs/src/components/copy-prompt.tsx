"use client";

import {Button} from "@heroui/react";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";

import {Iconify} from "@/components/iconify";
import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

/**
 * Props for the {@link CopyPrompt} MDX component.
 */
export interface CopyPromptProps {
  /**
   * The prompt text written to the clipboard when the user clicks the button.
   * Multi-line strings are supported.
   */
  prompt: string;
  /**
   * Inline description rendered next to the icon. Accepts MDX / JSX so bold
   * text, links, and other inline formatting are supported.
   */
  children: React.ReactNode;
  /**
   * Iconify icon name shown on the left. Defaults to `"sparkles"`.
   */
  icon?: string;
  /**
   * Optional additional class names applied to the outer container.
   */
  className?: string;
}

/**
 * CopyPrompt
 *
 * A compact horizontal card consisting of an icon on the left, an inline
 * description in the middle, and a "Copy prompt" button on the right.
 * The prompt itself is intentionally hidden — clicking the button copies
 * it to the user's clipboard so they can paste it into their AI assistant.
 *
 * This is a client component because clipboard access and the "Copied"
 * toggle state from `useCopyButton` must run in the browser.
 */
export function CopyPrompt({children, className, icon = "sparkles-fill", prompt}: CopyPromptProps) {
  const dict = useDictionary().copyPrompt;
  const [checked, onClick] = useCopyButton(() => {
    void navigator.clipboard.writeText(prompt);
  });

  return (
    <div
      className={cn(
        "flex gap-2 rounded-xl border border-border bg-surface py-3 pr-3 pl-1 text-sm text-surface-foreground shadow-surface",
        className,
      )}
    >
      <div className="flex gap-2">
        <div className="w-0.5 self-stretch rounded-sm bg-accent/50" role="none" />
        <Iconify className="mt-1 size-4 shrink-0 text-accent" icon={icon} />
      </div>
      <div className="prose-no-margin min-w-0 flex-1 leading-relaxed">{children}</div>
      <Button
        aria-label={checked ? dict.ariaLabelCopied : dict.ariaLabelCopy}
        className="shrink-0"
        isDisabled={checked}
        size="sm"
        type="button"
        variant="tertiary"
        onClick={onClick}
      >
        {checked ? (
          <>
            <Iconify icon="check" />
            {dict.copied}
          </>
        ) : (
          <>
            <Iconify icon="copy" />
            {dict.copy}
          </>
        )}
      </Button>
    </div>
  );
}
