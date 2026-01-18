"use client";

import type {KbdKey} from "./kbd.constants";
import type {KbdVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {kbdVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";

import {kbdKeysLabelMap, kbdKeysMap} from "./kbd.constants";

/* -------------------------------------------------------------------------------------------------
 * Kbd Context
 * -----------------------------------------------------------------------------------------------*/
type KbdContext = {
  slots?: ReturnType<typeof kbdVariants>;
};

const KbdContext = createContext<KbdContext>({});

/* -------------------------------------------------------------------------------------------------
 * Kbd Root
 * -----------------------------------------------------------------------------------------------*/
interface KbdRootProps extends ComponentPropsWithRef<"kbd">, KbdVariants {
  children: React.ReactNode;
  className?: string;
}

const KbdRoot = ({children, className, variant, ...props}: KbdRootProps) => {
  const slots = React.useMemo(() => kbdVariants({variant}), [variant]);

  return (
    <KbdContext value={{slots}}>
      <kbd {...props} className={slots.base({className})}>
        {children}
      </kbd>
    </KbdContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Kbd Abbr
 * -----------------------------------------------------------------------------------------------*/
interface KbdAbbrProps extends ComponentPropsWithRef<"abbr"> {
  className?: string;
  /**
   * The keyboard key to display
   */
  keyValue: KbdKey;
}

const KbdAbbr = ({className, keyValue, ...props}: KbdAbbrProps) => {
  const {slots} = useContext(KbdContext);

  return (
    <abbr
      className={composeSlotClassName(slots?.abbr, className)}
      title={kbdKeysLabelMap[keyValue]}
      {...props}
    >
      {kbdKeysMap[keyValue]}
    </abbr>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Kbd Content
 * -----------------------------------------------------------------------------------------------*/
interface KbdContentProps extends ComponentPropsWithRef<"span"> {
  children: React.ReactNode;
  className?: string;
}

const KbdContent = ({children, className, ...props}: KbdContentProps) => {
  const {slots} = useContext(KbdContext);

  return (
    <span className={composeSlotClassName(slots?.content, className)} {...props}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {KbdRoot, KbdAbbr, KbdContent};

export type {KbdRootProps, KbdAbbrProps, KbdContentProps};
