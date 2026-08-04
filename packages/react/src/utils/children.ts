import type {ReactElement, ReactNode} from "react";

import {Children, Fragment, cloneElement, isValidElement} from "react";

const CHILD_PROPS = "__heroui_child_props";
const SUPPORTS_CHILD_PROPS = Symbol("supportsChildProps");

type ChildProps = Record<string, unknown>;
type ChildPropsCarrier = {
  [CHILD_PROPS]?: ChildProps;
};
type ChildPropsComponent = React.ElementType & {
  [SUPPORTS_CHILD_PROPS]?: true;
};

/** Marks a component as able to consume or forward internal child props. */
export const enableChildProps = <T extends React.ElementType>(
  component: T,
): T & {displayName?: string} => {
  Object.defineProperty(component, SUPPORTS_CHILD_PROPS, {value: true});

  return component;
};

/** Returns whether an element can safely receive internal child props. */
export const supportsChildProps = (child: ReactElement): boolean => {
  if (child.type === Fragment) {
    let firstElement: ReactElement | undefined;

    Children.forEach((child.props as {children?: ReactNode}).children, (fragmentChild) => {
      if (!firstElement && isValidElement(fragmentChild)) {
        firstElement = fragmentChild;
      }
    });

    return firstElement ? supportsChildProps(firstElement) : false;
  }

  if (typeof child.type === "string") {
    return false;
  }

  return (child.type as ChildPropsComponent)[SUPPORTS_CHILD_PROPS] === true;
};

const setChildProps = (child: ReactElement, childProps: ChildProps): ReactElement => {
  const element = child as ReactElement<ChildPropsCarrier>;

  return cloneElement(element, {
    [CHILD_PROPS]: {
      ...element.props[CHILD_PROPS],
      ...childProps,
    },
  });
};

const forwardToFirstChild = (children: ReactNode, childProps: ChildProps): [ReactNode, boolean] => {
  let didForward = false;

  const forwardedChildren = Children.map(children, (child) => {
    if (didForward || !isValidElement(child)) {
      return child;
    }

    if (child.type === Fragment) {
      const [fragmentChildren, fragmentDidForward] = forwardToFirstChild(
        (child.props as {children?: ReactNode}).children,
        childProps,
      );

      if (!fragmentDidForward) {
        return child;
      }

      didForward = true;

      return cloneElement(child, undefined, fragmentChildren);
    }

    didForward = true;

    return setChildProps(child, childProps);
  });

  return [forwardedChildren, didForward];
};

/**
 * Passes internal parent props through a transparent wrapper to its first element child.
 */
export const forwardChildProps = <T extends {children?: ReactNode}>(inputProps: T): T => {
  const {[CHILD_PROPS]: childProps, ...props} = inputProps as T & ChildPropsCarrier;

  if (!childProps) {
    return inputProps;
  }

  const [children] = forwardToFirstChild(props.children, childProps);

  return {...props, children} as T;
};

/** Applies props forwarded by a transparent parent to the current component. */
export const mergeChildProps = <T extends object>(inputProps: T): T => {
  const {[CHILD_PROPS]: childProps, ...props} = inputProps as T & ChildPropsCarrier;

  if (!childProps) {
    return inputProps;
  }

  return {...childProps, ...props} as T;
};

/** Marks an element with props that transparent wrappers pass to their first child. */
export const withChildProps = (child: ReactElement, childProps: ChildProps): ReactElement => {
  if (child.type === Fragment) {
    const [children] = forwardToFirstChild(
      (child.props as {children?: ReactNode}).children,
      childProps,
    );

    return cloneElement(child, undefined, children);
  }

  return setChildProps(child, childProps);
};

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[];
}

export const pickChildren = <T = ReactNode>(
  children: T | undefined,
  targetChild: React.ElementType,
): [T | undefined, T[] | undefined] => {
  const target: T[] = [];

  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item as T);

      return null;
    }

    return item;
  })?.filter(Boolean) as T;

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};
