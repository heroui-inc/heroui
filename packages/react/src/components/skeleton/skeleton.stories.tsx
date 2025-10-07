import type {SkeletonProps} from "./index";
import type {Meta} from "@storybook/react";

import React from "react";

import {Skeleton} from "./index";

export default {
  argTypes: {
    animationType: {
      control: "select",
      options: ["shimmer", "pulse", "none"],
    },
  },
  component: Skeleton,
  title: "Components/Skeleton",
} as Meta<typeof Skeleton>;

const defaultArgs: SkeletonProps = {};

const Template = (props: SkeletonProps) => (
  <div className="bg-surface-1 shadow-panel w-[200px] space-y-5 rounded-lg p-4">
    <Skeleton className="h-24 rounded-lg" {...props} />
    <div className="space-y-3">
      <Skeleton className="h-3 w-3/5 rounded-lg" {...props} />
      <Skeleton className="h-3 w-4/5 rounded-lg" {...props} />
      <Skeleton className="h-3 w-2/5 rounded-lg" {...props} />
    </div>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
