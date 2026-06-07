"use client";

import {ChevronDown, ChevronUp, QrCode} from "@gravity-ui/icons";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Separator,
  useDisclosureGroupNavigation,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";
import {cn} from "tailwind-variants";

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
      <div className="flex flex-col gap-4 rounded-3xl p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">HeroUI Native</h3>
          <div className="flex gap-2">
            <Button
              aria-label="上一个折叠项"
              isDisabled={isPrevDisabled}
              size="sm"
              variant="secondary"
              onPress={onPrevious}
            >
              <ChevronUp className="size-4" />
            </Button>
            <Button
              aria-label="下一个折叠项"
              isDisabled={isNextDisabled}
              size="sm"
              variant="secondary"
              onPress={onNext}
            >
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </div>
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
                  <Icon className="[&_path]:fill-accent-foreground" icon="logos:expo-icon" />在 Expo
                  Go 预览
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
                  下载 HeroUI Native
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
                  <Icon icon="tabler:brand-apple-filled" />在 App Store 下载
                </Button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
}
