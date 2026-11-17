"use client";

import {ChevronDown} from "@gravity-ui/icons";
import {useI18n} from "fumadocs-ui/contexts/i18n";

import {HeroUIDocsAgentTrigger} from "@/components/ai/heroui-docs-agent-trigger";
import {LanguageToggle} from "@/components/fumadocs/ui/language-toggle";
import {SearchToggle} from "@/components/fumadocs/ui/search-toggle";
import {GitHubLinkSmall} from "@/components/github-link";
import {cn} from "@/utils/cn";

import {AppearancePill} from "./appearance-pill";

const ICON_BUTTON = "docs-pill docs-pill-segment size-8 min-w-0 [&_svg]:size-4";

function LanguagePill() {
  const {locale} = useI18n();

  return (
    <LanguageToggle
      className="docs-pill docs-pill-segment h-8 w-auto min-w-0 gap-1 px-3 text-xs font-medium"
      isIconOnly={false}
    >
      <span>{(locale ?? "en").toUpperCase()}</span>
      <ChevronDown className="size-3" />
    </LanguageToggle>
  );
}

/**
 * Page actions in the top-right corner of the docs: search, Ask AI, GitHub,
 * language and appearance. `compact` drops the items the mobile bar already
 * shows (search, AI) for use in the drawer.
 */
export function DocsActions({
  className,
  compact = false,
  showAI = true,
}: {
  className?: string;
  compact?: boolean;
  showAI?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {compact ? null : <SearchToggle hideIfDisabled className={ICON_BUTTON} />}
      {!compact && showAI ? <HeroUIDocsAgentTrigger className={ICON_BUTTON} /> : null}
      <GitHubLinkSmall className="docs-pill docs-pill-segment h-8 gap-1.5 px-3 text-xs font-medium [&_svg]:size-3.5" />
      <LanguagePill />
      <AppearancePill />
    </div>
  );
}

/** Search and Ask AI for the mobile bar. */
export function DocsMobileActions({showAI = true}: {showAI?: boolean}) {
  return (
    <div className="flex items-center gap-1.5">
      <SearchToggle hideIfDisabled className={ICON_BUTTON} />
      {showAI ? <HeroUIDocsAgentTrigger className={ICON_BUTTON} /> : null}
    </div>
  );
}
