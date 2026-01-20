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
  ThemeCodePanel,
  ThemePopover,
} from "./components";
import {MobileFooter} from "./components/mobile-footer";
import {Onboarding} from "./components/onboarding";
import {THEME_BUILDER_PAGE_ID, formRadiusOptions, radiusOptions} from "./constants";

export default function ThemeBuilderPage() {
  return (
    <CodePanelProvider>
      <Suspense>
        <div
          className="grid h-full grid-rows-[auto_1fr_auto] bg-background px-4 sm:h-screen sm:overflow-hidden sm:px-6"
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
          <div className="mx-auto hidden items-center justify-between gap-4 py-6 max-[1200px]:flex-col sm:flex">
            <div className="flex items-center gap-4">
              <AccentColorSelector />
              <BaseColorSlider />
              <FontFamilyPopover />
            </div>
            <div className="flex items-center gap-4">
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
              <ThemePopover />
            </div>
          </div>
          <div className="h-20 w-full sm:hidden" />
          <MobileFooter />
        </div>
        <Onboarding />
      </Suspense>
    </CodePanelProvider>
  );
}
