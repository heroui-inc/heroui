"use client";

import {ScrollShadow} from "@heroui/react";
import {useState} from "react";

import {THEME_BUILDER_BOTTOM_SHEET_ID} from "../constants";

import {AccentColorSelector} from "./accent-color-selector";
import {BaseColorSlider} from "./base-color-slider";
import {BottomSheet} from "./bottom-sheet";
import {FontFamilyPopover} from "./font-family-popover";
import {RadiusPopover} from "./radius-popover";
import {ShuffleButton} from "./shuffle-button";
import {ThemeInput} from "./theme-input";
import {ThemesList} from "./themes-list";

export function MobileFooter() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50 flex w-full items-center justify-between gap-4 border-t border-separator bg-background px-4 pt-3 pb-2 xl:hidden">
        <div className="w-full cursor-pointer" onClick={() => setIsSheetOpen(true)}>
          <ThemeInput />
        </div>
        <ShuffleButton />
      </div>
      <BottomSheet
        id={THEME_BUILDER_BOTTOM_SHEET_ID}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="flex w-full flex-col">
          <div className="mb-4 flex justify-center pb-2">
            <div className="h-1.5 w-9 rounded-sm bg-separator" />
          </div>
          <ThemesList />
          <div className="h-6" />
          <div className="mb-4 flex items-center gap-4 px-4">
            <AccentColorSelector />
            <BaseColorSlider />
          </div>
          <ScrollShadow
            hideScrollBar
            className="flex w-full items-center gap-4 px-4 pb-4"
            orientation="horizontal"
            visibility="none"
          >
            <FontFamilyPopover />
            <RadiusPopover label="Radius" variableKey="radius" />
            <RadiusPopover label="Radius Form" variableKey="formRadius" />
          </ScrollShadow>
        </div>
      </BottomSheet>
    </>
  );
}
