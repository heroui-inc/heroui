"use client";

import {
  Button,
  Disclosure,
  DisclosureBody,
  DisclosureContent,
  DisclosureGroup,
  DisclosureHeading,
  DisclosureIndicator,
  Separator,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";
import {cnBase} from "tailwind-variants";

export function Basic() {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-4 bg-transparent p-4">
        <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <Disclosure aria-label="Preview HeroUI Native" id="preview">
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
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
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
                  Download App
                </div>
                <DisclosureIndicator className="text-muted" />
              </Button>
            </DisclosureHeading>
            <DisclosureContent>
              <DisclosureBody className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-muted text-sm">
                  Download the HeroUI native app to explore our mobile components directly on your
                  device.
                </p>
                <img
                  alt="App Store QR Code"
                  className="max-w-54 aspect-square w-full object-cover"
                  src="https://raw.githubusercontent.com/heroui-inc/heroui-native/refs/heads/alpha/expo-go-qr.png"
                />
                <p className="text-muted text-sm">Available on iOS and Android devices.</p>
                <Button className="mt-4" variant="primary">
                  <Icon icon="tabler:brand-apple-filled" />
                  Download on App Store
                </Button>
              </DisclosureBody>
            </DisclosureContent>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
}
