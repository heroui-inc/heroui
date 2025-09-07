"use client";

import {Button, Disclosure} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

export function Basic() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="w-full max-w-md text-center">
      <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button slot="trigger" variant="secondary">
            <Icon icon="gravity-ui:qr-code" />
            Preview HeroUI Native
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="bg-panel shadow-border rounded-panel mx-2 mb-2 mt-4 flex flex-col items-center p-1 p-4 text-center">
            <p className="text-muted text-sm">
              Scan this QR code with your camera app to preview the HeroUI native components.
            </p>
            <img
              alt="Expo Go QR Code"
              className="max-w-54 my-2 aspect-square w-full object-cover"
              src="https://raw.githubusercontent.com/heroui-inc/heroui-native/refs/heads/alpha/expo-go-qr.png"
            />
            <p className="text-muted text-sm">Expo must be installed on your device.</p>
            <Button className="mt-4" variant="primary">
              <Icon icon="tabler:brand-apple-filled" />
              Download on App Store
            </Button>
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}
