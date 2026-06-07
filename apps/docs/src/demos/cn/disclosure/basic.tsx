"use client";

import {QrCode} from "@gravity-ui/icons";
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
            <QrCode />
            预览 HeroUI Native
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="shadow-panel flex flex-col items-center rounded-3xl bg-surface p-4 text-center">
            <p className="text-sm text-muted">
              使用手机相机扫描此二维码，即可预览 HeroUI Native 组件。
            </p>
            <img
              alt="Expo Go 二维码"
              className="aspect-square w-full max-w-54 object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
            />
            <p className="text-sm text-muted">设备需已安装 Expo。</p>
            <Button className="mt-4" variant="primary">
              <Icon icon="tabler:brand-apple-filled" /> 在 App Store 下载
            </Button>
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}
