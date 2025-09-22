"use client";

import type {ButtonProps} from "@heroui/react";
import type {SVGProps} from "react";

import {Button, Disclosure, DisclosureGroup, useDisclosureGroupNavigation} from "@heroui/react";
import React from "react";
import {cnBase} from "tailwind-variants";

function AppleShowcaseButton({
  children,
  className,
  isSelected,
  ...props
}: ButtonProps & {isSelected: boolean}) {
  return (
    <Button
      className={cnBase(
        "ease-in-out-quad h-14 rounded-full bg-[#1e1e20] text-[17px] text-[#f5f5f7] duration-[400ms] hover:bg-[#272729]",
        isSelected && "bg-[#272729]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function SelectedIphoneColorSwatch({color, name}: {color: string; name: string}) {
  return (
    <span
      className="border-border group relative size-6 rounded-lg border shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,.5)]"
      style={{
        backgroundColor: `${color}`,
      }}
    >
      <span className="sr-only">Copy {name} color</span>
    </span>
  );
}

function PlusIcon({className, height = 24, width = 24, ...props}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cnBase("size-6 flex-none", className)}
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" fill="none" r="11.3" stroke="currentColor" />
      <g fill="currentColor" stroke="none" transform="translate(7 7)">
        <path d="m9 4h-3v-3c0-0.553-0.447-1-1-1s-1 0.447-1 1v3h-3c-0.553 0-1 0.447-1 1s0.447 1 1 1h3v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3h3c0.553 0 1-0.447 1-1s-0.447-1-1-1" />
      </g>
    </svg>
  );
}

const showcaseItems = [
  {
    content: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange.",
    id: "colors",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/colors_orange__f2ug4x6ry8uq_large_2x.jpg",
    label: "Colors",
  },
  {
    content:
      "Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
    id: "aluminum",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/viewer_aluminum_endframe__fypyvk9kkg2m_large_2x.jpg",
    label: "Aluminum unibody",
  },
  {
    content:
      "Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
    id: "vapor-chamber",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/viewer_vapor_chamber_endframe__dst8qkmuys4m_large_2x.jpg",
    label: "Vapor chamber",
  },
  {
    content:
      "Protects the back of iPhone 17 Pro, making it 4x more resistant to cracks. New Ceramic Shield 2 on the front has 3x better scratch resistance.",
    id: "ceramic-shield",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/ceramic_shield__de0653vp43cm_large_2x.jpg",
    label: "Ceramic shield",
  },
  {
    content:
      "Our best‑ever 6.3‑inch and 6.9‑inch Super Retina XDR displays.5 Brighter. Better anti‑reflection. ProMotion up to 120Hz.",
    id: "immersive-pro-display",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/pro_display__c0jmzc5emcae_large_2x.jpg",
    label: "Immersive pro display",
  },
  {
    content:
      "Instantly take a photo, record video, adjust settings, and more. So you never miss a moment.",
    id: "camera-control",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/camera_control__cy5kilwa0kwi_large_2x.jpg",
    label: "Camera control",
  },
  {
    content:
      " A customizable fast track to your favorite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts, and more.",
    id: "action-button",
    imgSrc:
      "https://www.apple.com/v/iphone-17-pro/a/images/overview/product-viewer/viewer_action_button_startframe__bb2coc4lpj2a_large_2x.jpg",
    label: "Action button",
  },
];

export default function AppleIPhoneDisclosure() {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["colors"]));
  const itemIds = showcaseItems.map((item) => item.id);
  const isAnyItemExpanded = expandedKeys.size > 0;

  const {isNextDisabled, isPrevDisabled, onNext, onPrevious} = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <section className="w-full overflow-hidden">
      <div className="flex w-full items-center gap-8 px-8 py-8">
        <div
          data-expanded={isAnyItemExpanded}
          className={cnBase(
            "z-[1] hidden flex-col gap-5 opacity-0 sm:flex",
            "ease-out-quad data-[expanded=true]:duration-400 transition-all duration-300",
            "translate-y-[120px] data-[expanded=true]:translate-y-0 data-[expanded=true]:opacity-100",
            "scale-50 data-[expanded=true]:scale-100",
          )}
        >
          <Button
            isIconOnly
            aria-label="Previous disclosure"
            className="duration-250 ease-smooth rounded-full transition-all"
            isDisabled={isPrevDisabled}
            variant="secondary"
            onPress={onPrevious}
          >
            <svg className="fill-foreground size-8" viewBox="0 0 36 36">
              <path d="m11 20c0-.3838.1465-.7676.4395-1.0605l5.5-5.5c.5854-.5859 1.5356-.5859 2.1211 0l5.5 5.5c.5859.5859.5859 1.5352 0 2.1211-.5854.5859-1.5356.5859-2.1211 0l-4.4395-4.4395-4.4395 4.4395c-.5854.5859-1.5356.5859-2.1211 0-.293-.293-.4395-.6768-.4395-1.0605z" />
            </svg>
          </Button>
          <Button
            isIconOnly
            aria-label="Next disclosure"
            className="duration-250 ease-smooth rounded-full transition-all"
            isDisabled={isNextDisabled}
            variant="secondary"
            onPress={onNext}
          >
            <svg className="fill-foreground size-8" viewBox="0 0 36 36">
              <path d="m19.0625 22.5597 5.5-5.5076c.5854-.5854.5825-1.5323-.0039-2.1157-.5869-.5835-1.5366-.5815-2.1211.0039l-4.4375 4.4438-4.4375-4.4438c-.5845-.5854-1.5342-.5874-2.1211-.0039-.2944.2922-.4414.676-.4414 1.0598 0 .3818.1455.7637.4375 1.0559l5.5 5.5076c.2813.2815.6636.4403 1.0625.4403s.7812-.1588 1.0625-.4403z" />
            </svg>
          </Button>
        </div>
        <div className="z-[1] w-full max-w-md">
          <DisclosureGroup
            className="flex flex-col gap-y-3"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {showcaseItems.map((item) => (
              <Disclosure key={item.id} aria-label={item.label} id={item.id}>
                <Disclosure.Heading>
                  <AppleShowcaseButton isSelected={expandedKeys.has(item.id)} slot="trigger">
                    <div className="flex w-full items-center justify-start gap-3">
                      {item.id === "colors" ? (
                        <SelectedIphoneColorSwatch color="#f77314" name="Cosmic Orange" />
                      ) : (
                        <PlusIcon />
                      )}
                      {item.label}
                    </div>
                  </AppleShowcaseButton>
                </Disclosure.Heading>
                <Disclosure.Content className="ease-out-quad duration-[420ms] ease-[cubic-bezier(0.95,0.05,0.795,0.035)]">
                  <Disclosure.Body
                    data-expanded={expandedKeys.has(item.id)}
                    className={cnBase(
                      "mt-3 flex max-w-sm flex-col items-center gap-2 rounded-2xl bg-[rgba(42,42,45,0.72)] p-7 text-left backdrop-blur-[20px]",
                    )}
                  >
                    <p
                      data-expanded={expandedKeys.has(item.id)}
                      className={cnBase(
                        "text-[17px] font-light text-[#F5F5F7]",
                        "translate-y-[20px] opacity-0",
                        "data-[expanded=true]:translate-y-0 data-[expanded=true]:opacity-100",
                      )}
                      style={{
                        transition: expandedKeys.has(item.id)
                          ? "opacity 1200ms ease-out, translate 800ms cubic-bezier(0.18,0.89,0.32,1.27)"
                          : " ",
                        willChange: "opacity, translate",
                      }}
                    >
                      <strong className="font-medium">{item.label}</strong>.&nbsp;{item.content}
                    </p>
                  </Disclosure.Body>
                </Disclosure.Content>
              </Disclosure>
            ))}
          </DisclosureGroup>
        </div>
      </div>
      {showcaseItems.map((item) => (
        <img
          key={item.id}
          alt={item.label}
          data-selected={expandedKeys.has(item.id)}
          src={item.imgSrc}
          className={cnBase(
            "pointer-events-none absolute right-[10%] top-1/2 z-[0] hidden w-full max-w-6xl -translate-y-1/2 scale-[1.5] opacity-0 lg:block",
            "translate-x-[10%] data-[selected=true]:translate-x-0 data-[selected=true]:opacity-100",
          )}
          style={{
            transition: expandedKeys.has(item.id)
              ? "opacity 1000ms ease-out, translate 900ms var(--ease-out-quad)"
              : " ",
            willChange: "opacity, translate",
          }}
        />
      ))}
    </section>
  );
}
