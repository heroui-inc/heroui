import type {Decorator} from "@storybook/react";

import React, {useEffect} from "react";
import {scan} from "react-scan";
import {useGlobals} from "storybook/preview-api";

import {REACT_SCAN_GLOBAL_TYPE_ID} from "./constants";

export const withReactScan: Decorator = (Story) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  const [globals] = useGlobals();
  const isEnabled = globals[REACT_SCAN_GLOBAL_TYPE_ID] === "true";

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  useEffect(() => {
    scan({
      enabled: isEnabled,
    });
  }, [isEnabled]);

  return <Story />;
};
