import {ScrollShadow} from "@heroui/react";
import {Suspense} from "react";

import {CodePanelProvider} from "@/hooks/use-code-panel";

import {
  AccentColorSelector,
  BaseColorSlider,
  BuilderHeader,
  FontFamilyPopover,
  PreviewContainer,
  RadiusPopover,
  ShuffleButton,
  ThemeCodePanel,
  ThemePopover,
} from "./components";
import {SwitchMode} from "./components/switch-mode";
import {THEME_BUILDER_PAGE_ID} from "./constants";

export default function ThemeBuilderPage() {
  return (
    <CodePanelProvider>
      <Suspense>
        <div
          className="grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden bg-background px-6"
          id={THEME_BUILDER_PAGE_ID}
        >
          <BuilderHeader />
          <ScrollShadow
            hideScrollBar
            className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center overflow-scroll rounded-2xl border border-separator p-0"
            visibility="none"
          >
            <div className="relative flex w-full flex-1 items-center justify-center">
              <PreviewContainer />
              <ThemeCodePanel />
            </div>
          </ScrollShadow>
          <div className="mx-auto flex items-center justify-between gap-4 py-6">
            <AccentColorSelector />
            <BaseColorSlider />
            <FontFamilyPopover />
            <RadiusPopover label="Radius" variableKey="radius" />
            <RadiusPopover label="Radius Form" variableKey="formRadius" />
            <ThemePopover />
            <SwitchMode />
            <ShuffleButton />
          </div>
        </div>
      </Suspense>
    </CodePanelProvider>
  );
}
