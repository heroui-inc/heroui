import type {Decorator} from "@storybook/react";

import {useGlobals} from "storybook/preview-api";
import React, {StrictMode} from "react";

import {STRICT_MODE_GLOBAL_TYPE_ID} from "./constants";

export const withReactStrictMode: Decorator = (Story) => {
  const [globals] = useGlobals();
  const isStrict = globals[STRICT_MODE_GLOBAL_TYPE_ID] === "true";

  return isStrict ? (
    <StrictMode>
      <Story />
    </StrictMode>
  ) : (
    <Story />
  );
};
