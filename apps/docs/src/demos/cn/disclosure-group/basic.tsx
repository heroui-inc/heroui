"use client";

import {QrCode} from "@gravity-ui/icons";
import {Button, Disclosure, DisclosureGroup, Separator} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";
import {cn} from "tailwind-variants";

export function Basic() {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-4 bg-transparent p-4">
        <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <Disclosure aria-label="预览 HeroUI Native" id="preview">
            <Disclosure.Heading>
              <Button
                slot="trigger"
                variant={expandedKeys.has("preview") ? "secondary" : "tertiary"}
                className={cn("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("preview"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <QrCode />
                  预览 HeroUI Native
                </div>
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
                  <Icon className="[&_path]:fill-accent-foreground" icon="logos:expo-icon" /> 在
                  Expo Go 预览
                </Button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
            <Disclosure.Heading aria-label="下载 HeroUI Native">
              <Button
                slot="trigger"
                variant={expandedKeys.has("download") ? "secondary" : "tertiary"}
                className={cn("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("download"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <Icon icon="tabler:brand-apple-filled" />
                  下载应用
                </div>
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-sm text-muted">
                  下载 HeroUI Native 应用，即可在设备上直接体验我们的移动端组件。
                </p>
                <img
                  alt="App Store 二维码"
                  className="aspect-square w-full max-w-54 object-cover"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
                />
                <p className="text-sm text-muted">支持 iOS 和 Android 设备。</p>
                <Button className="mt-4" variant="primary">
                  <Icon icon="tabler:brand-apple-filled" /> 在 App Store 下载
                </Button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
}
