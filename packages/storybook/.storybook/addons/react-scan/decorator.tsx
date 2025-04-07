import {makeDecorator} from "@storybook/preview-api";
import React, {useEffect} from "react";
import {scan} from "react-scan";

const ReactScanDecorator = ({children}) => {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return children;
};

export const withReactScan = makeDecorator({
  name: "withReactScan",
  parameterName: "reactScan",
  wrapper: (getStory, context) => <ReactScanDecorator>{getStory(context)}</ReactScanDecorator>,
});
