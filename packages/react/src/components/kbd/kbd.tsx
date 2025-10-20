"use client";

import type {KbdKey} from "./kbd.constants";

import React, {createContext, useContext} from "react";

import {kbdKeysLabelMap, kbdKeysMap} from "./kbd.constants";
import {kbdVariants} from "./kbd.styles";

const KbdContext = createContext<{
  slots?: ReturnType<typeof kbdVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Kbd
 * -----------------------------------------------------------------------------------------------*/
interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLElement>;
}
const Kbd = ({children, className, ...props}: KbdProps) => {
  const slots = React.useMemo(() => kbdVariants(), []);

  return (
    <KbdContext.Provider value={{slots}}>
      <kbd {...props} className={slots.base({className})}>
        {children}
      </kbd>
    </KbdContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * KbdAbbr
 * -----------------------------------------------------------------------------------------------*/
interface KbdAbbrProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  /**
   * The keyboard key to display
   */
  keyValue: KbdKey;
  ref?: React.Ref<HTMLElement>;
}
const KbdAbbr = ({className, keyValue, ...props}: KbdAbbrProps) => {
  const {slots} = useContext(KbdContext);

  return (
    <abbr className={slots?.abbr({className})} title={kbdKeysLabelMap[keyValue]} {...props}>
      {kbdKeysMap[keyValue]}
    </abbr>
  );
};

/* -------------------------------------------------------------------------------------------------
 * KbdContent
 * -----------------------------------------------------------------------------------------------*/
interface KbdContentProps extends React.ComponentProps<"span"> {
  children: React.ReactNode;
  className?: string;
}
const KbdContent = ({children, className, ...props}: KbdContentProps) => {
  const {slots} = useContext(KbdContext);

  return (
    <span className={slots?.content({className})} {...props}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export type {KbdProps, KbdAbbrProps, KbdContentProps};
export {Kbd, KbdAbbr, KbdContent};
