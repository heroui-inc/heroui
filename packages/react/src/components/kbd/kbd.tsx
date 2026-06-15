"use client";

import type {KbdKey} from "./kbd.constants";
import type {DOMRenderProps} from "../../utils/dom";
import type {KbdVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {kbdVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

import {kbdKeysLabelMap, kbdKeysMap} from "./kbd.constants";

/* -------------------------------------------------------------------------------------------------
 * Kbd Context
 * -----------------------------------------------------------------------------------------------*/
type KbdContext = {
  abbrClassName?: string;
  contentClassName?: string;
};

const KbdContext = createContext<KbdContext>({});

/* -------------------------------------------------------------------------------------------------
 * Kbd Root
 * -----------------------------------------------------------------------------------------------*/
interface KbdRootProps<E extends keyof React.JSX.IntrinsicElements = "kbd"> extends DOMRenderProps<
  E,
  undefined
> {
  children: ReactNode;
  className?: string;
  /** Visual variant. */
  variant?: KbdVariants["variant"];
}

function KbdRootInner<E extends keyof React.JSX.IntrinsicElements = "kbd">({
  children,
  className,
  variant,
  ...props
}: KbdRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdRootProps<E>>) {
  const slots = useMemo(() => kbdVariants({variant}), [variant]);
  const contextValue = useMemo<KbdContext>(
    () => ({
      abbrClassName: slots.abbr(),
      contentClassName: slots.content(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <KbdContext value={contextValue}>
      <dom.kbd {...(props as any)} className={resolvedClassName}>
        {children}
      </dom.kbd>
    </KbdContext>
  );
}

const KbdRoot = memo(KbdRootInner) as <E extends keyof React.JSX.IntrinsicElements = "kbd">(
  props: KbdRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Kbd Abbr
 * -----------------------------------------------------------------------------------------------*/
interface KbdAbbrProps<E extends keyof React.JSX.IntrinsicElements = "abbr"> extends DOMRenderProps<
  E,
  undefined
> {
  className?: string;
  /** The keyboard key to display */
  keyValue: KbdKey;
}

function KbdAbbrInner<E extends keyof React.JSX.IntrinsicElements = "abbr">({
  className,
  keyValue,
  ...props
}: KbdAbbrProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdAbbrProps<E>>) {
  const {abbrClassName} = useContext(KbdContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, abbrClassName) as string,
    [className, abbrClassName],
  );

  return (
    <dom.abbr className={resolvedClassName} title={kbdKeysLabelMap[keyValue]} {...(props as any)}>
      {kbdKeysMap[keyValue]}
    </dom.abbr>
  );
}

const KbdAbbr = memo(KbdAbbrInner) as <E extends keyof React.JSX.IntrinsicElements = "abbr">(
  props: KbdAbbrProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdAbbrProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Kbd Content
 * -----------------------------------------------------------------------------------------------*/
interface KbdContentProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

function KbdContentInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: KbdContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdContentProps<E>>) {
  const {contentClassName} = useContext(KbdContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return (
    <dom.span className={resolvedClassName} {...(props as any)}>
      {children}
    </dom.span>
  );
}

const KbdContent = memo(KbdContentInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: KbdContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdContentProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {KbdRoot, KbdAbbr, KbdContent};

export type {KbdRootProps, KbdAbbrProps, KbdContentProps};
