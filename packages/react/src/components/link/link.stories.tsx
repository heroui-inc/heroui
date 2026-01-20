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
      href="https://heroui.com"
      rel="noopener noreferrer"
      target="_blank"
      className={buttonVariants({
        className: "gap-0 px-3 py-0.5 no-underline",
        size: "md",
        variant: "tertiary",
      })}
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
      <p className="text-sm text-muted">Always visible underline</p>
      <Link className="underline" href="#">
        Underline always visible
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">Underline visible on hover</p>
      <Link className="no-underline hover:underline" href="#">
        Hover to see the underline
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">No underline</p>
      <Link className="no-underline" href="#">
        Link without any underline
        <Link.Icon />
      </Link>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">Changing the underline offset</p>
      <div className="flex flex-col gap-3">
        <Link className="underline-offset-1 hover:underline" href="#">
          Offset 1 (1px space)
          <Link.Icon />
        </Link>
        <Link className="underline-offset-2 hover:underline" href="#">
          Offset 2 (2px space)
          <Link.Icon />
        </Link>
        <Link className="underline-offset-3 hover:underline" href="#">
          Offset 3 (3px space)
          <Link.Icon />
        </Link>
        <Link className="underline-offset-4 hover:underline" href="#">
          Offset 4 (4px space)
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
