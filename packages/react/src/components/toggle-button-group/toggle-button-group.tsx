"use client";

import type {ToggleButtonGroupVariants, ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonGroupVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {ToggleButtonGroup as ToggleButtonGroupPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ToggleButtonGroupContext = {
  slots?: ReturnType<typeof toggleButtonGroupVariants>;
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
}

const ToggleButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDetached = false,
  isDisabled,
  orientation = "horizontal",
  size,
  ...rest
}: ToggleButtonGroupRootProps) => {
  const slots = React.useMemo(
    () => toggleButtonGroupVariants({fullWidth, isDetached, orientation}),
    [fullWidth, isDetached, orientation],
  );

  return (
    <ToggleButtonGroupContext value={{slots, size, isDisabled}}>
      <ToggleButtonGroupPrimitive
        className={composeTwRenderProps(className, slots.base())}
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
 * ToggleButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupSeparatorProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const ToggleButtonGroupSeparator = ({className, ...props}: ToggleButtonGroupSeparatorProps) => {
  const {slots} = useContext(ToggleButtonGroupContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="toggle-button-group-separator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupSeparator, ToggleButtonGroupContext};

export type {ToggleButtonGroupRootProps, ToggleButtonGroupSeparatorProps};
