import type {Meta} from "@storybook/react";

import React from "react";

import {DemoComponents} from "./demos";

const meta: Meta = {
  title: "Components Demo",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Components = () => {
  return <DemoComponents />;
};

Components.parameters = {
  docs: {
    description: {
      story:
        "A comprehensive showcase of HeroUI components in action. These demos demonstrate real-world usage patterns and component combinations.",
    },
  },
};
