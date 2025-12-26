import type {UseSpacerProps} from "./use-spacer";

import {forwardRef} from "@heroui/system-rsc";

import {useSpacer} from "./use-spacer";

export interface SpacerProps extends UseSpacerProps {}

const Spacer = forwardRef<"span", SpacerProps>((props, ref) => {
  const {Component, getSpacerProps} = useSpacer({...props});

  return <Component ref={ref} {...getSpacerProps()} />;
});

Spacer.displayName = "HeroUI.Spacer";

export default Spacer;
