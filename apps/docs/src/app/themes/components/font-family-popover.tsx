"use client";

import {ChevronsExpandVertical, FontCase} from "@gravity-ui/icons";
import {InputGroup, Popover} from "@heroui/react";
import {useState} from "react";

import {fonts} from "../constants";
import {useCustomFonts, useVariableSetter} from "../hooks";
import {extractFontFamilyFromUrl, isCustomFontUrl} from "../utils/font-utils";

import {CustomFonts} from "./custom-fonts";
import {LockableLabel} from "./lockable-label";
import {SuggestedFonts} from "./suggested-fonts";

export function FontFamilyPopover() {
  const {variables} = useVariableSetter();
  const {customFonts} = useCustomFonts();
  const [mode, setMode] = useState<"suggested" | "custom">("suggested");

  // Find current font label - check predefined fonts first, then URL-based custom fonts
  const currentSuggestedFont = fonts.find((f) => f.id === variables.fontFamily);
  const currentUrlFontLabel = isCustomFontUrl(variables.fontFamily)
    ? extractFontFamilyFromUrl(variables.fontFamily)
    : null;
  const currentFontLabel = currentSuggestedFont?.label ?? currentUrlFontLabel ?? "Inter";

  return (
    <Popover>
      <div className="flex flex-col gap-1">
        <LockableLabel label="Font Family" variable="fontFamily" />
        <Popover.Trigger>
          <InputGroup className="w-40 cursor-pointer">
            <InputGroup.Prefix className="w-10">
              <FontCase />
            </InputGroup.Prefix>
            <InputGroup.Input
              readOnly
              className="max-w-20 cursor-pointer"
              id="font-family"
              name="font-family"
              value={currentFontLabel}
            />
            <InputGroup.Suffix className="w-10">
              <ChevronsExpandVertical className="size-3" />
            </InputGroup.Suffix>
          </InputGroup>
        </Popover.Trigger>
      </div>
      <Popover.Content className="w-[325px] rounded-xl" placement="top">
        <Popover.Dialog className="p-3">
          {mode === "suggested" ? (
            <SuggestedFonts customFonts={customFonts} goToCustom={() => setMode("custom")} />
          ) : (
            <CustomFonts goToSuggested={() => setMode("suggested")} />
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
