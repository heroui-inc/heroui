"use client";

import type {ListBoxVariants} from "./listbox.styles";
import type {ComponentPropsWithRef} from "react";

import React from "react";
import {ListBox as ListBoxPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {listboxVariants} from "./listbox.styles";

/* -------------------------------------------------------------------------------------------------
 * ListBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxRootProps<T extends object>
  extends ComponentPropsWithRef<typeof ListBoxPrimitive<T>>,
    ListBoxVariants {
  className?: string;
}

function ListBoxRoot<T extends object>({className, variant, ...props}: ListBoxRootProps<T>) {
  const styles = React.useMemo(() => listboxVariants({variant}), [variant]);

  return (
    <ListBoxPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="listbox"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot};

export type {ListBoxRootProps};
