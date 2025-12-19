"use client";

import type {MenuVariants} from "./menu.styles";
import type {ComponentPropsWithRef} from "react";

import React from "react";
import {Menu as MenuPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {menuVariants} from "./menu.styles";

/* -------------------------------------------------------------------------------------------------
 * Menu Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuRootProps<T extends object>
  extends ComponentPropsWithRef<typeof MenuPrimitive<T>>, MenuVariants {
  className?: string;
}

function MenuRoot<T extends object>({className, ...props}: MenuRootProps<T>) {
  const styles = React.useMemo(() => menuVariants(), []);

  return (
    <MenuPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="menu"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuRoot};

export type {MenuRootProps};
