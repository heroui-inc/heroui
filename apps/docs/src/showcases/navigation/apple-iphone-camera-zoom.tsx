"use client";

import type {Key} from "react-aria-components";

import {Tabs} from "@heroui/react";
import React from "react";
import {cnBase} from "tailwind-variants";

const DEFAULT_ZOOM = 200;

const zoomLevels = [200, 100, 48, 35, 28, 24, 13, "macro"] as const;

const zoomXMap: Record<number | "macro", string> = {
  [100]: "4x",
  [13]: "0.5x",
  [200]: "8x",
  [24]: "1x",
  [28]: "1.2x",
  [35]: "1.5x",
  [48]: "2x",
  ["macro"]: "0.2x",
};

const zoomImgMap: Record<number | "macro", string> = {
  [100]:
    "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/100mm__cykxcenbhvue_large_2x.jpg",
  [13]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/13mm__dzafu9h1kaye_large_2x.jpg",
  [200]:
    "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/200mm__c8kya18imsqe_large_2x.jpg",
  [24]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/24mm__e54cxtdkdrwy_large_2x.jpg",
  [28]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/28mm__fylmxo06jq6i_large_2x.jpg",
  [35]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/35mm__k375wbkrjp2e_large_2x.jpg",
  [48]: "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/48mm__bmrwps1q6w76_large_2x.jpg",
  ["macro"]:
    "https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/macro__bb7oud7ri2o2_large_2x.jpg",
};

export default function AppleIPhoneCameraZoom() {
  const [selectedZoom, setSelectedZoom] = React.useState<Key>(DEFAULT_ZOOM);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="relative aspect-[7/5] w-full max-w-[840px] sm:h-[400px] md:h-[500px] lg:h-[540px]">
          {Object.keys(zoomImgMap).map((key) => (
            <img
              key={key}
              alt={`iPhone camera at ${key}${key === "macro" ? "" : "mm"} zoom`}
              aria-hidden={selectedZoom !== key}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity delay-200 duration-[800ms] ease-in-out data-[selected=true]:opacity-100 data-[selected=true]:delay-0"
              data-selected={selectedZoom === key}
              src={zoomImgMap[key as keyof typeof zoomImgMap]}
            />
          ))}
        </div>
        <Tabs defaultSelectedKey={DEFAULT_ZOOM} onSelectionChange={setSelectedZoom}>
          <Tabs.ListContainer className="scrollbar-hide my-4 w-full max-w-full overflow-x-auto sm:my-6">
            <Tabs.List
              aria-label="Camera zoom options"
              className="bg-surface-secondary *:text-muted w-fit min-w-min rounded-full *:h-8 *:w-fit *:px-3 *:text-xs *:font-normal *:opacity-80 *:hover:opacity-100 *:data-[selected=true]:text-black sm:*:h-9 sm:*:px-4 sm:*:text-sm"
            >
              {zoomLevels.map((zoom) => (
                <Tabs.Tab
                  key={zoom}
                  className={zoom === "macro" ? "capitalize" : ""}
                  id={zoom.toString()}
                >
                  {zoom} {zoom === "macro" ? "" : "mm"}
                  <Tabs.Indicator className="rounded-full bg-white shadow-none duration-[320ms]" />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <div className="relative h-10 w-10">
          {Object.keys(zoomXMap).map((key) => (
            <p
              key={key}
              aria-hidden={selectedZoom !== key}
              data-selected={selectedZoom === key}
              className={cnBase(
                "text-foreground ease-in-out-quad absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-75 text-[21px] font-medium opacity-0 transition-[scale,opacity] duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] data-[selected=true]:scale-100 data-[selected=true]:opacity-100 data-[selected=true]:delay-200",
                {
                  "sr-only": selectedZoom !== key,
                },
              )}
            >
              {zoomXMap[key as keyof typeof zoomXMap]}
            </p>
          ))}
        </div>
        <footer className="dark:text-muted/40 text-muted/50 mt-4 w-full px-4 text-center text-xs sm:text-sm">
          <a href="https://www.apple.com/iphone-17-pro/" rel="noopener noreferrer" target="_blank">
            Showcase based on Apple&apos;s iPhone 17 Pro camera zoom showcase
          </a>
        </footer>
      </div>
    </div>
  );
}
