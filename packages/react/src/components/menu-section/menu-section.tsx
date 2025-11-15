"use client";

import type {ComponentProps} from "react";

import React from "react";
import {MenuSection as MenuSectionPrimitive} from "react-aria-components";

import {menuSectionVariants} from "./menu-section.styles";

/* -------------------------------------------------------------------------------------------------
 * Menu Section Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuSectionRootProps extends ComponentProps<typeof MenuSectionPrimitive> {
  className?: string;
}

const MenuSectionRoot = ({children, className, ...props}: MenuSectionRootProps) => {
  const styles = React.useMemo(
    () => menuSectionVariants({class: typeof className === "string" ? className : undefined}),
    [className],
  );

  return (
    <MenuSectionPrimitive className={styles} {...props}>
      {children}
    </MenuSectionPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuSectionRoot};

export type {MenuSectionRootProps};
