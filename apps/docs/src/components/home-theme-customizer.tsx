"use client";

import {HomeColorSwatchPicker} from "./home-color-swatch-picker";
import {HomeThemeSwitch} from "./home-theme-switch";
import HorizontalScrollingBanner from "./horizontal-scrolling-banner";

export function HomeThemeCustomizer() {
  return (
    <>
      <div className="text-muted mt-8 flex flex-col gap-3">
        <p>Customize theme (preview)</p>
        <div className="flex items-center gap-3">
          <HomeColorSwatchPicker />
          <HomeThemeSwitch />
        </div>
      </div>

      {/* Demo Image Section */}
      <div className="max-w-8xl mt-12 w-full px-4">
        <HorizontalScrollingBanner showShadow duration={160} gap="1.5rem" shadowSize="80px">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-default flex h-[320px] w-[250px] items-center justify-center rounded-lg text-2xl font-bold"
            >
              {item}
            </div>
          ))}
        </HorizontalScrollingBanner>
      </div>
    </>
  );
}
