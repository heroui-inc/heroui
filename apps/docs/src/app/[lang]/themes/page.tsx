import {Suspense} from "react";

import {ProBanner} from "@/app/[lang]/(home)/components/pro-banner";
import {CodePanelProvider} from "@/hooks/use-code-panel";
import {DictionaryProvider} from "@/hooks/use-dictionary";
import {getDictionary, hasLocale} from "@/lib/dictionaries";

import {
  AccentColorSelector,
  BaseColorSlider,
  BuilderHeader,
  FontFamilyPopover,
  RadiusPopover,
  ThemePopover,
} from "./components";
import {MobileFooter} from "./components/mobile-footer";
import {Onboarding} from "./components/onboarding";
import {ThemeBuilderContent} from "./components/theme-builder-content";
import {THEME_BUILDER_PAGE_ID, formRadiusOptions, radiusOptions} from "./constants";

export default async function ThemeBuilderPage({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : await getDictionary("en");
  const radiusDict = dict.themeBuilder.radius;

  return (
    <DictionaryProvider dict={dict}>
      <CodePanelProvider>
        <Suspense>
          <div
            className="grid h-dvh grid-rows-[auto_1fr_auto] bg-background px-4 sm:overflow-hidden sm:px-6"
            id={THEME_BUILDER_PAGE_ID}
          >
            <BuilderHeader />
            <ThemeBuilderContent />
            <div className="mx-auto hidden items-center justify-between gap-4 py-6 max-[1200px]:flex-col sm:flex">
              <div className="flex items-center gap-4">
                <AccentColorSelector />
                <BaseColorSlider />
                <FontFamilyPopover />
              </div>
              <div className="flex items-center gap-4">
                <RadiusPopover
                  description={radiusDict.description}
                  label={radiusDict.label}
                  radiusOptions={radiusOptions}
                  variableKey="radius"
                />
                <RadiusPopover
                  description={radiusDict.formDescription}
                  label={radiusDict.formLabel}
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
          <ProBanner />
        </Suspense>
      </CodePanelProvider>
    </DictionaryProvider>
  );
}
