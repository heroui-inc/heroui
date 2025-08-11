import type {LinkProps} from "./link";
import type {Meta} from "@storybook/react";

import React from "react";

import {buttonVariants} from "../button/index";
import {LinkIcon as LinkIconSvg} from "../icons";

import Link from "./index";

export default {
  argTypes: {},
  component: Link,
  title: "✅ Ready/Link",
} as Meta<typeof Link>;

const DefaultTemplate = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link showIcon href="#">
      Call to action
      <Link.Icon />
    </Link>
    <Link isDisabled showIcon href="#">
      Call to action
      <Link.Icon />
    </Link>
    <Link
      showIcon
      className={buttonVariants({className: "px-3", size: "md", variant: "tertiary"})}
      href="https://heroui.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      HeroUI
      <Link.Icon className="h-2 w-2" />
    </Link>
  </div>
);

const CustomIconTemplate = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link showIcon href="#">
      External Link
      <Link.Icon>
        <LinkIconSvg className="h-3 w-3" />
      </Link.Icon>
    </Link>
    <Link showIcon href="#" iconPlacement="start">
      <Link.Icon>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </Link.Icon>
      Info Link
    </Link>
  </div>
);

const LegacyCompatibilityTemplate = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    {/* Legacy usage without compound pattern still works */}
    <Link href="#">Simple link without icon</Link>
    {/* Can still add icons manually like before */}
    <Link className="inline-flex items-center gap-1" href="#">
      Manual icon <LinkIconSvg className="h-3 w-3" />
    </Link>
  </div>
);

const IconPlacementTemplate = (_props: LinkProps) => (
  <div className="flex flex-col gap-4">
    <Link showIcon href="#" iconPlacement="end">
      Icon at end (default)
      <Link.Icon />
    </Link>
    <Link showIcon href="#" iconPlacement="start">
      <Link.Icon />
      Icon at start
    </Link>
  </div>
);

export const Default = {
  args: {},
  render: DefaultTemplate,
};

export const CustomIcon = {
  args: {},
  render: CustomIconTemplate,
};

export const LegacyCompatibility = {
  args: {},
  render: LegacyCompatibilityTemplate,
};

export const IconPlacement = {
  args: {},
  render: IconPlacementTemplate,
};
