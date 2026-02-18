import * as React from "react";
import {renderHook} from "@testing-library/react";
import {HeroUIProvider} from "@heroui/system";

import {useButton} from "../src/use-button";

describe("useButton", () => {
  it("should respect disableRipple={false} when disableAnimation is true", () => {
    const {result} = renderHook(() => useButton({disableAnimation: true, disableRipple: false}));

    expect(result.current.disableRipple).toBe(false);
  });

  it("should use global disableRipple when prop is not specified", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <HeroUIProvider disableRipple>{children}</HeroUIProvider>
    );

    const {result} = renderHook(() => useButton({}), {wrapper});

    expect(result.current.disableRipple).toBe(true);
  });

  it("should override global disableRipple with explicit prop", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <HeroUIProvider disableRipple>{children}</HeroUIProvider>
    );

    const {result} = renderHook(() => useButton({disableRipple: false}), {wrapper});

    expect(result.current.disableRipple).toBe(false);
  });
});
