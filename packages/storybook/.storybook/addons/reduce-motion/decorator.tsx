import {addons, makeDecorator} from "@storybook/preview-api";
import React, {useEffect, useState} from "react";

import {Emitter} from "../../constant";

const ReduceMotionDecorator = ({children}) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const channel = addons.getChannel();

    const updateReduceMotion = (val: boolean) => {
      setReduceMotion(val);
      // Update the data attribute on the root element
      if (val) {
        document.documentElement.setAttribute("data-reduce-motion", "true");
      } else {
        document.documentElement.removeAttribute("data-reduce-motion");
      }
    };

    channel.on(Emitter.REDUCE_MOTION, updateReduceMotion);

    return () => {
      channel.removeListener(Emitter.REDUCE_MOTION, updateReduceMotion);
      // Clean up on unmount
      document.documentElement.removeAttribute("data-reduce-motion");
    };
  }, []);

  return <>{children}</>;
};

export const withReduceMotion = makeDecorator({
  name: "withReduceMotion",
  parameterName: "reduceMotion",
  wrapper: (getStory, context) => <ReduceMotionDecorator>{getStory(context)}</ReduceMotionDecorator>,
});
