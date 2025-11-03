import {IconButton} from "@storybook/components";
import {addons, types} from "@storybook/manager-api";
import React, {useState} from "react";

import {Emitter, __DEV__} from "../../constant";

const ReduceMotionToggle = () => {
  const channel = addons.getChannel();

  const [reduceMotion, setReduceMotion] = useState(false);

  const onChange = () => {
    setReduceMotion((prev) => {
      const newValue = !prev;

      channel.emit(Emitter.REDUCE_MOTION, newValue);

      return newValue;
    });
  };

  return (
    <IconButton
      key="reducemotion"
      active={reduceMotion}
      title={reduceMotion ? "Enable Animations" : "Disable All Animations"}
      onClick={() => onChange()}
    >
      Reduce Motion
    </IconButton>
  );
};

if (__DEV__) {
  addons.register("ReduceMotionToggle", () => {
    addons.add("ReduceMotionToggle", {
      match: ({viewMode}) => !!viewMode?.match(/^(story|docs)$/),
      render: () => <ReduceMotionToggle />,
      title: "Reduce Motion toggle",
      type: types.TOOL,
    });
  });
}
