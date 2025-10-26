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
  title: "Components/Feedback/Skeleton",
} as Meta<typeof Skeleton>;

const defaultArgs: SkeletonProps = {};

const Template = (props: SkeletonProps) => (
  <div className="bg-surface-1 shadow-surface w-[200px] space-y-5 rounded-3xl p-4">
    <Skeleton className="h-24 rounded-xl" {...props} />
    <div className="space-y-3">
      <Skeleton className="h-3 w-3/5 rounded-lg" {...props} />
      <Skeleton className="h-3 w-4/5 rounded-lg" {...props} />
      <Skeleton className="h-3 w-2/5 rounded-lg" {...props} />
    </div>
  </div>
);

const GridTemplate = (props: SkeletonProps) => (
  <div className="grid w-full max-w-xl grid-cols-3 gap-4">
    <Skeleton className="h-24 rounded-xl" {...props} />
    <Skeleton className="h-24 rounded-xl" {...props} />
    <Skeleton className="h-24 rounded-xl" {...props} />
  </div>
);

const SingleShimmerTemplate = (props: SkeletonProps) => (
  <div className="skeleton--shimmer relative grid w-full max-w-xl grid-cols-3 gap-4 overflow-hidden rounded-xl">
    <Skeleton className="h-24 rounded-xl" {...props} />
    <Skeleton className="h-24 rounded-xl" {...props} />
    <Skeleton className="h-24 rounded-xl" {...props} />
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Grid = {
  args: defaultArgs,
  render: GridTemplate,
};

export const SingleShimmer = {
  args: defaultArgs,
  render: SingleShimmerTemplate,
};
