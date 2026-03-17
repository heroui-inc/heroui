"use client";

import {ScrollShadow} from "@heroui/react";

import {cn} from "@/utils/cn";

import {usePreviewTab} from "../hooks";

import {PreviewContainer} from "./preview-container";
import {ThemeCodePanel} from "./theme-code-panel";

export const ThemeBuilderContent = () => {
  const {selectedTab} = usePreviewTab();
  const isComponentsTab = selectedTab === "components";

  return (
    <ScrollShadow
      hideScrollBar
      visibility="none"
      className={cn(
        "mx-auto flex h-full w-full max-w-[1400px] flex-col items-center overflow-scroll rounded-2xl border border-separator p-0",
        !isComponentsTab && "lg:h-fit lg:self-center",
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <PreviewContainer />
        <ThemeCodePanel />
      </div>
    </ScrollShadow>
  );
};
