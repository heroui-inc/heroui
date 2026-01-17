"use client";

import type {TagVariants} from "../tag";
import type {ComponentPropsWithRef} from "react";

import {tagGroupVariants} from "@heroui/styles";
import React, {createContext, useContext, useMemo} from "react";
import {TagGroup as TagGroupPrimitive, TagList as TagListPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * TagGroup Context
 * -----------------------------------------------------------------------------------------------*/
type TagGroupContext = {
  slots?: ReturnType<typeof tagGroupVariants>;
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

const TagGroupRoot = ({children, className, size, variant, ...restProps}: TagGroupRootProps) => {
  const slots = useMemo(() => tagGroupVariants(), []);

  return (
    <TagGroupContext
      value={{
        slots,
        size,
        variant,
      }}
    >
      <TagGroupPrimitive className={slots.base({className})} data-slot="tag-group" {...restProps}>
        {children}
      </TagGroupPrimitive>
    </TagGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TagGroup List
 * -----------------------------------------------------------------------------------------------*/
type TagGroupListProps<T extends object> = ComponentPropsWithRef<typeof TagListPrimitive<T>> & {};

const TagGroupList = <T extends object>({
  children,
  className,
  ...restProps
}: TagGroupListProps<T>) => {
  const {slots} = useContext(TagGroupContext);

  return (
    <TagListPrimitive
      className={composeTwRenderProps(className, slots?.list())}
      data-slot="tag-group-list"
      {...restProps}
    >
      {children}
    </TagListPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagGroupRoot, TagGroupList, TagGroupContext};

export type {TagGroupRootProps, TagGroupListProps};
