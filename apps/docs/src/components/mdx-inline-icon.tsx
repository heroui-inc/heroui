import type {IconifyProps} from "./iconify";

import {cn} from "@/utils/cn";

import {Iconify} from "./iconify";

/**
 * Decorative Gravity UI icon sized to the surrounding text, for MDX content
 * (e.g. `<InlineIcon icon="globe" />` in front of a list label). It is hidden
 * from assistive tech and dropped from the LLM markdown, so the text next to it
 * must carry the meaning.
 */
export function InlineIcon({className, ...props}: IconifyProps) {
  return (
    <Iconify
      aria-hidden
      className={cn("inline-block size-[1em] shrink-0 align-[-0.125em] text-muted", className)}
      focusable={false}
      {...props}
    />
  );
}
