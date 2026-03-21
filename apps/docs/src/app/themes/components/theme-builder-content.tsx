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
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col gap-0.5 rounded-3xl bg-surface-secondary/80 p-2 pt-0">
      <div className="flex h-9 shrink-0 items-center justify-between pt-1 pr-2 pl-2">
        <div className="flex flex-1 items-center gap-2.5">
          <div className="size-3 rounded-full bg-muted opacity-30" />
          <div className="size-3 rounded-full bg-muted opacity-30" />
          <div className="size-3 rounded-full bg-muted opacity-30" />
        </div>
        <a
          className={`text-end text-[13px] font-medium text-muted transition-opacity duration-300 hover:text-foreground ${!isComponentsTab ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
            "relative flex min-h-0 w-full flex-1",
            isComponentsTab ? "items-start" : "items-center justify-center",
          )}
        >
          <PreviewContainer />
          <ThemeCodePanel />
        </div>
      </ScrollShadow>
    </div>
  );
};
