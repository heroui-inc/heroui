import type {Decorator} from "@storybook/react";

import {useGlobals} from "storybook/preview-api";
import React, {useEffect} from "react";
import {scan} from "react-scan";

import {REACT_SCAN_GLOBAL_TYPE_ID} from "./constants";

export const withReactScan: Decorator = (Story) => {
  const [globals] = useGlobals();
  const isEnabled = globals[REACT_SCAN_GLOBAL_TYPE_ID] === "true";

  useEffect(() => {
    scan({
      enabled: isEnabled,
    });
  }, [isEnabled]);

  return <Story />;
};
