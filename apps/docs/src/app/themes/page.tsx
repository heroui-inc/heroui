"use client";

import {Shuffle} from "@gravity-ui/icons";
import {Button, Label, ScrollShadow} from "@heroui/react";

import {DemoComponents} from "@/components/demo";
import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";
import {useThemeBuilder} from "@/stores/theme-builder";

import {
  AccentColorPicker,
  FontFamilyPopover,
  RadiusPopover,
  ThemeHeader,
  ThemePopover,
} from "./components";
import {colors, fonts, radiusOptions, themes} from "./constants";
import {useThemeVariables} from "./hooks";

export default function ThemeBuilderPage() {
  const randomize = useThemeBuilder((state) => state.randomize);

  // Sync store values to CSS custom properties
  useThemeVariables();

  const handleShuffle = () => {
    randomize({
      colors: colors.map((c) => c.id),
      fonts: fonts.map((f) => f.id),
      radiusOptions: radiusOptions.map((r) => r.id),
      themes: themes.map((t) => t.id),
    });
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden px-6">
      <ThemeHeader />
      <ScrollShadow
        hideScrollBar
        className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center overflow-scroll rounded-2xl border border-separator py-7"
        visibility="none"
      >
        <div className="flex w-full flex-1 items-center font-sans" id="theme-builder-content">
          <DemoComponents />
        </div>
      </ScrollShadow>
      <div className="mx-auto flex items-center justify-between gap-4 p-6">
        <AccentColorPicker />
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
