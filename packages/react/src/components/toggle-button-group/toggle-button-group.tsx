"use client";

import type {ToggleButtonGroupVariants, ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonGroupVariants} from "@heroui/styles";
import React, {createContext} from "react";
import {ToggleButtonGroup as ToggleButtonGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ToggleButtonGroupContext = {
  size?: ToggleButtonVariants["size"];
  isDisabled?: boolean;
};

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContext>({});

// Property name to mark direct children of ToggleButtonGroup
export const TOGGLE_BUTTON_GROUP_CHILD = "__toggle_button_group_child";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupRootProps
  extends ComponentPropsWithRef<typeof ToggleButtonGroupPrimitive>, ToggleButtonGroupVariants {
  /** Size to propagate to all child ToggleButtons */
  size?: ToggleButtonVariants["size"];
  /** Whether the group buttons are visually separated (detached) instead of connected */
  isDetached?: boolean;
  /** Whether to hide the separator between buttons */
  hideSeparator?: boolean;
}

const ToggleButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  hideSeparator = false,
  isDetached = false,
  isDisabled,
  orientation = "horizontal",
  size,
  ...rest
}: ToggleButtonGroupRootProps) => {
  const styles = toggleButtonGroupVariants({
    fullWidth,
    orientation,
  });

  return (
    <ToggleButtonGroupContext value={{size, isDisabled}}>
      <ToggleButtonGroupPrimitive
        className={composeTwRenderProps(className, styles)}
        data-detached={isDetached ? "true" : undefined}
        data-hide-separator={hideSeparator ? "true" : undefined}
        data-size={size ?? "md"}
        data-slot="toggle-button-group"
        isDisabled={isDisabled}
        orientation={orientation}
        {...rest}
      >
        {children}
      </ToggleButtonGroupPrimitive>
    </ToggleButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupContext};

export type {ToggleButtonGroupRootProps};
