import type {ReactNode} from "react";

import {Children, isValidElement} from "react";

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
