"use client";

import {ScrollShadow} from "@heroui/react";
import {useState} from "react";

import {THEME_BUILDER_BOTTOM_SHEET_ID, formRadiusOptions, radiusOptions} from "../constants";

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
      <div className="fixed right-0 bottom-0 left-0 z-50 flex w-full items-center justify-between gap-4 border-t border-separator bg-background px-6 pt-3 pb-4 min-[1200px]:hidden">
        <div className="w-full cursor-pointer" onClick={() => setIsSheetOpen(true)}>
          <ThemeInput />
        </div>
        <ShuffleButton enableKeyboardShortcut={false} />
      </div>
      <BottomSheet
        id={THEME_BUILDER_BOTTOM_SHEET_ID}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="flex w-full flex-col items-start md:items-center">
          <div className="mb-4 flex w-full justify-center pb-2">
            <div className="h-1.5 w-9 rounded-sm bg-separator" />
          </div>
          <ThemesList />
          <div className="h-6" />
          <div className="flex w-full flex-wrap gap-4 gap-x-0 md:w-auto">
            <div className="mb-4 flex items-center gap-4 pl-4">
              <AccentColorSelector />
              <BaseColorSlider />
            </div>
            <ScrollShadow
              hideScrollBar
              className="flex w-full items-center gap-4 px-4 pb-4 md:w-auto"
              orientation="horizontal"
              visibility="none"
            >
              <FontFamilyPopover />
              <RadiusPopover
                description="Affects the overall UI, like menus and modals"
                label="Radius"
                radiusOptions={radiusOptions}
                variableKey="radius"
              />
              <RadiusPopover
                description="Affects form elements, like inputs and selects"
                label="Radius Form"
                radiusOptions={formRadiusOptions}
                variableKey="formRadius"
              />
            </ScrollShadow>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
