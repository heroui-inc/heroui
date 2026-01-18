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
import {MobileFooter} from "./components/mobile-footer";
import {SwitchMode} from "./components/switch-mode";
import {THEME_BUILDER_PAGE_ID} from "./constants";

export default function ThemeBuilderPage() {
  return (
    <CodePanelProvider>
      <Suspense>
        <div
          className="grid h-full grid-rows-[auto_1fr_auto] bg-background px-4 xl:h-screen xl:overflow-hidden xl:px-6"
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
          <div className="mx-auto hidden items-center justify-between gap-4 py-6 xl:flex">
            <AccentColorSelector />
            <BaseColorSlider />
            <FontFamilyPopover />
            <RadiusPopover
              label="Radius"
              tooltip="Global border radius for UI components like menus, cards, or modals."
              variableKey="radius"
            />
            <RadiusPopover
              label="Radius Form"
              tooltip="Border radius for form elements like inputs and selects."
              variableKey="formRadius"
            />
            <ThemePopover />
            <SwitchMode label="Mode" />
            <div>
              <div className="h-5" />
              <ShuffleButton />
            </div>
          </div>
          <div className="h-20 w-full xl:hidden" />
          <MobileFooter />
        </div>
      </Suspense>
    </CodePanelProvider>
  );
}
