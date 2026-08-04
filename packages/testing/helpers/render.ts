import type {RenderOptions} from "@testing-library/react";
import type {ReactElement, ReactNode} from "react";

import {render as rtlRender} from "@testing-library/react";

export type HeroUIRenderOptions = Omit<RenderOptions, "wrapper"> & {
  wrapper?: (props: {children: ReactNode}) => ReactNode;
};

export const render = (ui: ReactElement, options: HeroUIRenderOptions = {}) => {
  const {wrapper, ...rest} = options;

  return rtlRender(ui, {
    ...rest,
    wrapper: wrapper ? ({children}) => wrapper({children}) as ReactElement : undefined,
  });
};
