import type {Decorator} from "@storybook/react";

import React, {StrictMode} from "react";
import {useGlobals} from "storybook/preview-api";

import {STRICT_MODE_GLOBAL_TYPE_ID} from "./constants";

export const withReactStrictMode: Decorator = (Story) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
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
