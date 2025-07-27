import type {LinkProps} from "./link";
import type {Meta} from "@storybook/react";

import React from "react";

import {LinkIcon} from "../icons";

import {Link} from "./index";

export default {
  argTypes: {},
  component: Link,
  title: "Components/Link",
} as Meta<typeof Link>;

const Template = (_props: LinkProps) => (
  <div className="flex items-center gap-4">
    <Link href="#">
      Call to action <LinkIcon className="text-muted absolute -right-2 top-1" />
    </Link>
    <Link isDisabled href="#">
      Call to action <LinkIcon className="text-muted absolute -right-2 top-1" />
    </Link>
    {/* <Link
      href="https://heroui.com"
      target="_blank"
      className={(renderProps) =>
        buttonVariants({...renderProps, className: "hover:no-underline", variant: "ghost"})
      }
    >
      Call to action
    </Link> */}
  </div>
);

export const Default = {
  args: {},
  render: Template,
};
