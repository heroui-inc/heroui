import type {LinkProps} from "./link";
import type {Meta} from "@storybook/react";

import React from "react";

import {buttonVariants} from "../button/index";
import {LinkIcon} from "../icons";

import {Link} from "./index";

export default {
  argTypes: {},
  component: Link,
  title: "✅ Ready/Link",
} as Meta<typeof Link>;

const Template = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      Call to action <LinkIcon className="text-muted absolute -right-2 top-1" />
    </Link>
    <Link isDisabled href="#">
      Call to action <LinkIcon className="text-muted absolute -right-2 top-1" />
    </Link>
    <Link
      // className="button button--md button--tertiary relative h-8 pr-5"
      className={buttonVariants({className: "relative h-8 pr-5", size: "md", variant: "tertiary"})}
      href="https://heroui.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      HeroUI <LinkIcon className="absolute right-3 top-1 h-2 w-2 text-inherit" />
    </Link>
  </div>
);

export const Default = {
  args: {},
  render: Template,
};
