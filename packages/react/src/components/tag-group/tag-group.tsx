"use client";

import type {TagVariants} from "../tag";
import type {ComponentPropsWithRef} from "react";

import {tagGroupVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
} from "react-aria-components/TagGroup";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * TagGroup Context
 * -----------------------------------------------------------------------------------------------*/
type TagGroupContext = {
  listClassName?: string;
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
};

const TagGroupContext = createContext<TagGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * TagGroup Root
 * -----------------------------------------------------------------------------------------------*/
type TagGroupRootProps = ComponentPropsWithRef<typeof TagGroupPrimitive> & {
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
};

const TagGroupRoot = memo(function TagGroupRoot({
  children,
  className,
  size,
  variant,
  ...restProps
}: TagGroupRootProps) {
  const slots = useMemo(() => tagGroupVariants(), []);
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );
  const contextValue = useMemo<TagGroupContext>(
    () => ({
      listClassName: slots.list(),
      size,
      variant,
    }),
    [size, slots, variant],
  );

  return (
    <TagGroupContext value={contextValue}>
      <TagGroupPrimitive className={resolvedClassName} data-slot="tag-group" {...restProps}>
        {children}
      </TagGroupPrimitive>
    </TagGroupContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * TagGroup List
 * -----------------------------------------------------------------------------------------------*/
type TagGroupListProps<T extends object> = ComponentPropsWithRef<typeof TagListPrimitive<T>> & {};

function TagGroupListInner<T extends object>({
  children,
  className,
  ...restProps
}: TagGroupListProps<T>) {
  const {listClassName} = useContext(TagGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, listClassName),
    [className, listClassName],
  );

  return (
    <TagListPrimitive className={resolvedClassName} data-slot="tag-group-list" {...restProps}>
      {children}
    </TagListPrimitive>
  );
}

const TagGroupList = memo(TagGroupListInner) as <T extends object>(
  props: TagGroupListProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagGroupRoot, TagGroupList, TagGroupContext};

export type {TagGroupRootProps, TagGroupListProps};
