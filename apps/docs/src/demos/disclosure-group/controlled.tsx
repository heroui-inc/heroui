"use client";

import {
  Button,
  DisclosureBody,
  DisclosureContent,
  DisclosureGroup,
  DisclosureHeading,
  DisclosureIndicator,
  DisclosureRoot,
  Separator,
  useDisclosureGroupNavigation,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";
import {cnBase} from "tailwind-variants";

export function Controlled() {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));
  const itemIds = ["preview", "download"]; // Track our disclosure items

  const {isNextDisabled, isPrevDisabled, onNext, onPrevious} = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <div className="w-full max-w-md">
      <div className="rounded-panel flex flex-col gap-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">HeroUI Native</h3>
          <div className="flex gap-2">
            <Button
              aria-label="Previous disclosure"
              isDisabled={isPrevDisabled}
              size="sm"
              variant="secondary"
              onPress={onPrevious}
            >
              <Icon className="size-4" icon="gravity-ui:chevron-up" />
            </Button>
            <Button
              aria-label="Next disclosure"
              isDisabled={isNextDisabled}
              size="sm"
              variant="secondary"
              onPress={onNext}
            >
              <Icon className="size-4" icon="gravity-ui:chevron-down" />
            </Button>
          </div>
        </div>
        <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <DisclosureRoot aria-label="Preview HeroUI Native" id="preview">
            <DisclosureHeading>
              <Button
                slot="trigger"
                variant={expandedKeys.has("preview") ? "secondary" : "tertiary"}
                className={cnBase("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("preview"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <Icon icon="gravity-ui:qr-code" />
                  Preview HeroUI Native
                </div>
                <DisclosureIndicator className="text-muted" />
              </Button>
            </DisclosureHeading>
            <DisclosureContent>
              <DisclosureBody className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-muted text-sm">
                  Scan this QR code with your camera app to preview the HeroUI native components.
                </p>
                <img
                  alt="Expo Go QR Code"
                  className="max-w-54 aspect-square w-full object-cover"
                  src="https://raw.githubusercontent.com/heroui-inc/heroui-native/refs/heads/alpha/expo-go-qr.png"
                />
                <p className="text-muted text-sm">Expo must be installed on your device.</p>
                <Button className="mt-4" variant="primary">
                  <Icon className="[&_path]:fill-accent-foreground" icon="logos:expo-icon" />
                  Preview on Expo Go
                </Button>
              </DisclosureBody>
            </DisclosureContent>
          </DisclosureRoot>
          <Separator className="my-2" />
          <DisclosureRoot id="download">
            <DisclosureHeading aria-label="Download HeroUI Native">
              <Button
                slot="trigger"
                variant={expandedKeys.has("download") ? "secondary" : "tertiary"}
                className={cnBase("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("download"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <Icon icon="tabler:brand-apple-filled" />
                  Download HeroUI Native
                </div>
                <DisclosureIndicator className="text-muted" />
              </Button>
            </DisclosureHeading>
            <DisclosureContent>
              <DisclosureBody className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-muted text-sm">
                  Scan this QR code with your camera app to preview the HeroUI native components.
                </p>
                <img
                  alt="Expo Go QR Code"
                  className="max-w-54 aspect-square w-full object-cover"
                  src="https://raw.githubusercontent.com/heroui-inc/heroui-native/refs/heads/alpha/expo-go-qr.png"
                />
                <p className="text-muted text-sm">Expo must be installed on your device.</p>
                <Button className="mt-4" variant="primary">
                  <Icon icon="tabler:brand-apple-filled" />
                  Download on App Store
                </Button>
              </DisclosureBody>
            </DisclosureContent>
          </DisclosureRoot>
        </DisclosureGroup>
      </div>
    </div>
  );
}
