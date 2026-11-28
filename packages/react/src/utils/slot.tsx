"use client";

import type {ElementType, HTMLAttributes, ReactElement, ReactNode, Ref} from "react";

import {Children, useCallback} from "react";

type AnyProps = Record<string, any>;

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * Child props win, except event handlers (both run, child first), `style`
 * (shallow merge) and `className` / `aria-describedby` (joined).
 */
function mergeSlotProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = {...slotProps, ...childProps};

  for (const name in childProps) {
    const slotValue = slotProps[name];
    const childValue = childProps[name];

    if (/^on[A-Z]/.test(name)) {
      if (slotValue && childValue) {
        merged[name] = (...args: unknown[]) => {
          const result = childValue(...args);

          slotValue(...args);

          return result;
        };
      } else if (slotValue) {
        merged[name] = slotValue;
      }
    } else if (name === "style") {
      merged[name] = {...slotValue, ...childValue};
    } else if (name === "className" || name === "aria-describedby") {
      merged[name] = [slotValue, childValue].filter(Boolean).join(" ");
    }
  }

  return merged;
}

const assignRef = (ref: Ref<HTMLElement> | undefined, node: HTMLElement | null) => {
  if (typeof ref === "function") return ref(node);
  if (ref) ref.current = node;

  return undefined;
};

/**
 * Renders its single child element with the slot's props and ref merged in.
 * Backs the `asChild` prop.
 */
export const Slot = ({children, ref, ...slotProps}: SlotProps) => {
  const child = Children.only(children) as ReactElement<AnyProps>;
  const Component = child.type as ElementType;
  const {ref: childRef, ...childProps} = child.props;
  const mergedProps = mergeSlotProps(slotProps, childProps);

  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      const refs = [childRef as Ref<HTMLElement> | undefined, ref];
      const cleanups = refs.map((item) => assignRef(item, node));

      return () => {
        cleanups.forEach((cleanup, index) => {
          if (typeof cleanup === "function") cleanup();
          else assignRef(refs[index], null);
        });
      };
    },
    [childRef, ref],
  );

  return <Component {...mergedProps} ref={mergedRef} />;
};

Slot.displayName = "HeroUI.Slot";
