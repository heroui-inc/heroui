import type {Meta} from "@storybook/react";

import React from "react";

import {ColorsDemo} from "../components/colors-demo";

const meta: Meta = {
  title: "Colors Demo",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => {
  return <ColorsDemo />;
};

Default.parameters = {
  docs: {
    description: {
      story:
        "An interactive color palette generator showcasing HeroUI's color system. Adjust the base tone and gray chroma to see how colors change across light and dark themes.",
    },
  },
};
