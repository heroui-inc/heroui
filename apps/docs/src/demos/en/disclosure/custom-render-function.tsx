"use client";

import {QrCode} from "@gravity-ui/icons";
import {Button, Disclosure} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

export function CustomRenderFunction() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="w-full max-w-md text-center">
      <Disclosure
        isExpanded={isExpanded}
        render={(props) => <div {...props} data-custom="foo" />}
        onExpandedChange={setIsExpanded}
      >
        <Disclosure.Heading>
          <Button slot="trigger" variant="secondary">
            <QrCode />
            Preview HeroUI Native
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content render={(props) => <div data-custom="bar" {...props} />}>
          <Disclosure.Body className="shadow-panel flex flex-col items-center rounded-3xl bg-surface p-4 text-center">
            <p className="text-sm text-muted">
              Scan this QR code with your camera app to preview the HeroUI native components.
            </p>
            <img
              alt="Expo Go QR Code"
              className="aspect-square w-full max-w-54 object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
            />
            <p className="text-sm text-muted">Expo must be installed on your device.</p>
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
