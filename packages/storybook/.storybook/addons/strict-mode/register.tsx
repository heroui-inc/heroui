import {IconButton} from "@storybook/components";
// 用于表示状态的图标
import {addons, types} from "@storybook/manager-api";
import React, {useState} from "react";

import {Emitter, __DEV__} from "../../constant";

const StrictModeToggle = () => {
  const channel = addons.getChannel();

  const [isStrict, setStrict] = useState(true);

  const onChange = () => {
    setStrict((prev) => {
      const newValue = !prev;

      channel.emit(Emitter.STRICT_MODE, newValue);

      return newValue;
    });
  };

  return (
    <IconButton
      key="strictmode"
      active={isStrict}
      title={isStrict ? "Disable StrictMode" : "Enable StrictMode"}
      onClick={() => onChange()}
    >
      React Strict Mode
    </IconButton>
  );
};

if (__DEV__) {
  addons.register("ReactStrictModeToggle", () => {
    addons.add("ReactStrictModeToggle", {
      match: ({viewMode}) => !!viewMode?.match(/^(story|docs)$/),
      render: () => <StrictModeToggle />,
      title: "React Strict Mode toggle",
      type: types.TOOL,
    });
  });
}
