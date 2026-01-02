"use client";

import {Shuffle} from "@gravity-ui/icons";
import {Button, Label, ScrollShadow} from "@heroui/react";

import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";

import {
  AccentColorSelector,
  BuilderHeader,
  FontFamilyPopover,
  PreviewContainer,
  RadiusPopover,
  ThemePopover,
} from "./components";
import {useCssSync, useRandomizeVariables} from "./hooks";

export default function ThemeBuilderPage() {
  const randomize = useRandomizeVariables();

  // Sync url search values to CSS custom properties
  useCssSync();

  const handleShuffle = () => {
    randomize();
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden px-6">
      <BuilderHeader />
      <ScrollShadow
        hideScrollBar
        className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center overflow-scroll rounded-2xl border border-separator py-7"
        visibility="none"
      >
        <PreviewContainer />
      </ScrollShadow>
      <div className="mx-auto flex items-center justify-between gap-4 p-6">
        <AccentColorSelector />
        <FontFamilyPopover />
        <RadiusPopover label="Radius" variableKey="radius" />
        <RadiusPopover label="Radius Form" variableKey="formRadius" />
        <ThemePopover />
        <div className="flex flex-col gap-1">
          <Label>Mode</Label>
          <ThemeToggle className="h-9" mode="light-dark" />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-transparent">Shuffle</Label>
          <Button isIconOnly size="md" variant="tertiary" onPress={handleShuffle}>
            <Shuffle />
          </Button>
        </div>
      </div>
    </div>
  );
}
