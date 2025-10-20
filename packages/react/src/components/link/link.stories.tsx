import type {LinkProps} from "./index";
import type {Meta} from "@storybook/react";

import React from "react";

import {buttonVariants} from "../button/index";
import {ExternalLinkIcon} from "../icons";

import {Link, LinkIcon} from "./index";

export default {
  argTypes: {},
  component: Link,
  title: "Components/Navigation/Link",
} as Meta<typeof Link>;

const DefaultTemplate = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      Call to action
      <LinkIcon />
    </Link>
    <Link isDisabled href="#">
      Call to action
      <LinkIcon />
    </Link>
    <Link
      className={buttonVariants({className: "px-3", size: "md", variant: "tertiary"})}
      href="https://heroui.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      HeroUI
      <LinkIcon className="h-2 w-2" />
    </Link>
  </div>
);

const CustomIconTemplate = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      External Link
      <LinkIcon>
        <ExternalLinkIcon className="h-3 w-3" />
      </LinkIcon>
    </Link>
    <Link href="#">
      <LinkIcon>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </LinkIcon>
      Info Link
    </Link>
  </div>
);

const IconPlacementTemplate = (_props: LinkProps) => (
  <div className="flex flex-col gap-4">
    <Link href="#">
      Icon at end (default)
      <LinkIcon />
    </Link>
    <Link href="#">
      <LinkIcon />
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

export const IconPlacement = {
  args: {},
  render: IconPlacementTemplate,
};
