import type {LinkProps} from "./index";
import type {Meta} from "@storybook/react";

import React from "react";

import {buttonVariants} from "../button/index";
import {ExternalLinkIcon} from "../icons";

import {Link} from "./index";

export default {
  argTypes: {},
  component: Link,
  parameters: {
    layout: "centered",
  },
  title: "Components/Navigation/Link",
} as Meta<typeof Link>;

const DefaultTemplate = (_props: Link["RootProps"]) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      Call to action
      <Link.Icon />
    </Link>
    <Link isDisabled href="#">
      Call to action
      <Link.Icon />
    </Link>
    <Link
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

const CustomIconTemplate = (_props: Link["RootProps"]) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      External Link
      <Link.Icon>
        <ExternalLinkIcon className="h-3 w-3" />
      </Link.Icon>
    </Link>
    <Link href="#">
      <Link.Icon>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </Link.Icon>
      Info Link
    </Link>
  </div>
);

const IconPlacementTemplate = (_props: Link["RootProps"]) => (
  <div className="flex flex-col gap-4">
    <Link href="#">
      Icon at end (default)
      <Link.Icon />
    </Link>
    <Link href="#">
      <Link.Icon />
      Icon at start
    </Link>
  </div>
);

const UnderlineVariantsTemplate = (_props: LinkProps) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">Underline on hover (default)</p>
      <Link href="#" underline="hover">
        Hover to see underline animation
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">Always visible underline</p>
      <Link href="#" underline="always">
        Underline always visible (50% opacity, 100% on hover)
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">No underline</p>
      <Link href="#" underline="none">
        Link without any underline
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">Underline offset variations</p>
      <div className="flex flex-col gap-3">
        <Link href="#" underline="always" underlineOffset={1}>
          Offset 1 (default - no space)
          <Link.Icon />
        </Link>
        <Link href="#" underline="always" underlineOffset={2}>
          Offset 2 (2px space)
          <Link.Icon />
        </Link>
        <Link href="#" underline="always" underlineOffset={3}>
          Offset 3 (4px space)
          <Link.Icon />
        </Link>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-muted text-sm">Always underline with different offsets</p>
      <div className="flex flex-col gap-3">
        <Link href="#" underline="always" underlineOffset={1}>
          Always underlined - Offset 1
          <Link.Icon />
        </Link>
        <Link href="#" underline="always" underlineOffset={2}>
          Always underlined - Offset 2
          <Link.Icon />
        </Link>
        <Link href="#" underline="always" underlineOffset={3}>
          Always underlined - Offset 3
          <Link.Icon />
        </Link>
      </div>
    </div>
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

export const IconPlacement = {
  args: {},
  render: IconPlacementTemplate,
};

export const UnderlineVariants = {
  args: {},
  render: UnderlineVariantsTemplate,
};
