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
        // Flat note like the MDX Callout (colored icon, no border or shadow), on the
        // same fill as code blocks so it sits with the install steps around it.
        "flex items-center gap-3 rounded-2xl bg-(--docs-demo) py-3 ps-4 pe-3 text-sm leading-6",
        className,
      )}
    >
      <span aria-hidden className="flex h-6 shrink-0 items-center self-start">
        <Iconify className="size-4 text-accent" icon={icon} />
      </span>
      <div className="prose-no-margin min-w-0 flex-1 text-(--docs-fg-muted)">{children}</div>
      <Button
        aria-label={checked ? dict.ariaLabelCopied : dict.ariaLabelCopy}
        // Light: white pill so it lifts off the code-block fill. Dark keeps the tertiary fill.
        className="shrink-0 [--button-bg-hover:var(--surface-hover)] [--button-bg-pressed:var(--surface-hover)] [--button-bg:var(--surface)] dark:[--button-bg-hover:var(--default-hover)] dark:[--button-bg-pressed:var(--default-hover)] dark:[--button-bg:var(--default)]"
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
