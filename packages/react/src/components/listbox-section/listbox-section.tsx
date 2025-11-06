"use client";

import type {ComponentProps} from "react";

import React from "react";
import {ListBoxSection as ListBoxSectionPrimitive} from "react-aria-components";

import {listboxSectionVariants} from "./listbox-section.styles";

/* -------------------------------------------------------------------------------------------------
 * ListBox Section Root
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxSectionRootProps extends ComponentProps<typeof ListBoxSectionPrimitive> {
  className?: string;
}

const ListBoxSectionRoot = ({children, className, ...props}: ListBoxSectionRootProps) => {
  const styles = React.useMemo(
    () => listboxSectionVariants({class: typeof className === "string" ? className : undefined}),
    [className],
  );

  return (
    <ListBoxSectionPrimitive className={styles} {...props}>
      {children}
    </ListBoxSectionPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxSectionRoot};

export type {ListBoxSectionRootProps};
