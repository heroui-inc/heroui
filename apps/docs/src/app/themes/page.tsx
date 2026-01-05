import {Label, ScrollShadow} from "@heroui/react";
import {Suspense} from "react";

import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";
import {CodePanelProvider} from "@/hooks/use-code-panel";

import {
  AccentColorSelector,
  BuilderHeader,
  FontFamilyPopover,
  PreviewContainer,
  RadiusPopover,
  ShuffleButton,
  ThemeCodePanel,
  ThemePopover,
} from "./components";

export default function ThemeBuilderPage() {
  return (
    <CodePanelProvider>
      <Suspense>
        <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden px-6">
          <BuilderHeader />
          <ScrollShadow
            hideScrollBar
            className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center overflow-scroll rounded-2xl border border-separator py-7"
            visibility="none"
          >
            <div className="relative flex w-full flex-1 items-center justify-center">
              <PreviewContainer />
              <ThemeCodePanel />
            </div>
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
            <ShuffleButton />
          </div>
        </div>
      </Suspense>
    </CodePanelProvider>
  );
}
