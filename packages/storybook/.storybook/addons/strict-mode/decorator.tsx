import {addons, makeDecorator} from "@storybook/preview-api";
import React, {StrictMode, useEffect, useState} from "react";

import {Emitter} from "../../constant";

const StrictModeDecorator = ({children}) => {
  const [isStrict, setStrict] = useState(true);

  useEffect(() => {
    const channel = addons.getChannel();

    const updateStrict = (val: boolean) => setStrict(val);

    channel.on(Emitter.STRICT_MODE, updateStrict);

    return () => {
      channel.removeListener(Emitter.STRICT_MODE, updateStrict);
    };
  }, []);

  return isStrict ? <StrictMode>{children}</StrictMode> : children;
};

export const withReactStrictMode = makeDecorator({
  name: "withReactStrictMode",
  parameterName: "reactStrictMode",
  wrapper: (getStory, context) => <StrictModeDecorator>{getStory(context)}</StrictModeDecorator>,
});
