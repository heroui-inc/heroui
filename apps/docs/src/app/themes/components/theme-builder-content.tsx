"use client";

import {ScrollShadow} from "@heroui/react";

import {cn} from "@/utils/cn";

import {HEROUI_PRO_URL} from "../constants";
import {usePreviewTab} from "../hooks";

import {PreviewContainer} from "./preview-container";
import {ThemeCodePanel} from "./theme-code-panel";

function getProUrl(utm: {campaign?: string; content?: string; medium: string}) {
  const url = new URL(HEROUI_PRO_URL);

  url.searchParams.set("utm_source", "heroui.com");
  url.searchParams.set("utm_medium", utm.medium);
  if (utm.campaign) url.searchParams.set("utm_campaign", utm.campaign);
  if (utm.content) url.searchParams.set("utm_content", utm.content);

  return url.toString();
}

export const ThemeBuilderContent = () => {
  const {selectedTab} = usePreviewTab();
  const isComponentsTab = selectedTab === "components";

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col">
      <div
        className={`flex shrink-0 justify-end px-2 pb-1 transition-opacity duration-300 ${!isComponentsTab ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <a
          className="text-[13px] font-medium text-muted hover:text-foreground"
          rel="noopener noreferrer"
          target="_blank"
          href={getProUrl({
            campaign: "theme-builder",
            content: `template-${selectedTab}`,
            medium: "themes-page",
          })}
        >
          Available in Pro as template
        </a>
      </div>
      <ScrollShadow
        hideScrollBar
        visibility="none"
        className={cn(
          "flex min-h-0 w-full flex-1 flex-col rounded-2xl border border-border/50",
          isComponentsTab ? "overflow-scroll" : "overflow-hidden",
        )}
      >
        <div
          className={cn(
            "relative flex w-full",
            isComponentsTab
              ? "min-h-full items-start"
              : "min-h-0 flex-1 items-center justify-center",
          )}
        >
          <PreviewContainer />
          <ThemeCodePanel />
        </div>
      </ScrollShadow>
    </div>
  );
};
