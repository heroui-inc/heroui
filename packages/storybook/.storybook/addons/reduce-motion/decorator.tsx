import type {Decorator} from "@storybook/react";

import React, {useEffect} from "react";
import {useGlobals} from "storybook/preview-api";

import {REDUCE_MOTION_GLOBAL_TYPE_ID} from "./constants";

export const withReduceMotion: Decorator = (Story) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  const [globals] = useGlobals();
  const reduceMotion = globals[REDUCE_MOTION_GLOBAL_TYPE_ID] === "true";

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.setAttribute("data-reduce-motion", "true");
    } else {
      document.documentElement.removeAttribute("data-reduce-motion");
    }
  }, [reduceMotion]);

  return <Story />;
};
