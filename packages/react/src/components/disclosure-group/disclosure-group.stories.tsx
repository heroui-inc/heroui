import type {DisclosureGroupProps} from "./disclosure-group";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";
import {cnBase} from "tailwind-variants";

import {Button} from "../button";
import {Disclosure} from "../disclosure";
import {Separator} from "../separator";

import {DisclosureGroup, useDisclosureGroupNavigation} from "./index";

export default {
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    allowsMultipleExpanded: {
      control: {
        type: "boolean",
      },
    },
  },
  component: DisclosureGroup,
  title: "Components/DisclosureGroup",
} as Meta<typeof DisclosureGroup>;

const defaultArgs: DisclosureGroupProps = {
  isDisabled: false,
  allowsMultipleExpanded: false,
};

const Template = (props: DisclosureGroupProps) => {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-1 shadow-border rounded-panel flex flex-col gap-4 p-4">
        <DisclosureGroup {...props} expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <Disclosure aria-label="Preview HeroUI Native" id="preview">
            <Disclosure.Heading>
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
            <Disclosure.Heading aria-label="Download HeroUI Native">
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
};

const ControlledTemplate = (props: DisclosureGroupProps) => {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));
  const itemIds = ["preview", "download"]; // Track our disclosure items

  const {isNextDisabled, isPrevDisabled, onNext, onPrevious} = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-1 shadow-border rounded-panel flex flex-col gap-4 p-4">
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
              <Icon className="size-4" icon="lucide:chevron-up" />
            </Button>
            <Button
              aria-label="Next disclosure"
              isDisabled={isNextDisabled}
              size="sm"
              variant="secondary"
              onPress={onNext}
            >
              <Icon className="size-4" icon="lucide:chevron-down" />
            </Button>
          </div>
        </div>
        <DisclosureGroup {...props} expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <Disclosure aria-label="Preview HeroUI Native" id="preview">
            <Disclosure.Heading>
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
            <Disclosure.Heading aria-label="Download HeroUI Native">
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
};

const Showcase1Template = (props: DisclosureGroupProps) => {
  const [expandedKeys, setExpandedKeys] = React.useState(new Set<string | number>(["preview"]));
  const itemIds = ["preview", "download"]; // Track our disclosure items

  const {isNextDisabled, isPrevDisabled, onNext, onPrevious} = useDisclosureGroupNavigation({
    expandedKeys,
    itemIds,
    onExpandedChange: setExpandedKeys,
  });

  return (
    <section className="bg-surface-1 flex w-full items-center gap-8 px-8 py-8">
      <div className="flex flex-col gap-5">
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
      <div className="w-full max-w-md">
        <DisclosureGroup {...props} expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
          <Disclosure aria-label="Preview HeroUI Native" id="preview">
            <Disclosure.Heading>
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
            <Disclosure.Heading aria-label="Download HeroUI Native">
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
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
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
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </section>
  );
};

export const Default = {
  args: {
    ...defaultArgs,
  },
  render: Template,
};

export const Controlled = {
  args: {
    ...defaultArgs,
  },
  render: ControlledTemplate,
};

export const Showcase1 = {
  args: {
    children: null,
  },
  render: Showcase1Template,
  name: "Showcases/Apple iPhone 17 Pro Disclosure Group",
};
