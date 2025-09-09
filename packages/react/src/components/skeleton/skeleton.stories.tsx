import type {SkeletonProps} from "./index";
import type {Meta} from "@storybook/react";

import React from "react";

import {Skeleton} from "./index";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "default", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: Skeleton,
  title: "Components/Skeleton",
} as Meta<typeof Skeleton>;

const defaultArgs: SkeletonProps = {};

const Template = () => (
  <div className="bg-surface-1 shadow-border w-[200px] space-y-5 rounded-lg p-4">
    <Skeleton className="h-24 rounded-lg" />
    <div className="space-y-3">
      <Skeleton className="h-3 w-3/5 rounded-lg" />
      <Skeleton className="h-3 w-4/5 rounded-lg" />
      <Skeleton className="h-3 w-2/5 rounded-lg" />
    </div>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
