"use client";

import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext, useMemo} from "react";
import {TagGroup as TagGroupPrimitive, TagList as TagListPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {tagGroupVariants} from "./tag-group.styles";

/* -------------------------------------------------------------------------------------------------
 * TagGroup Context
 * -----------------------------------------------------------------------------------------------*/
type TagGroupContext = {
  slots?: ReturnType<typeof tagGroupVariants>;
  size?: "sm" | "md" | "lg";
};

const TagGroupContext = createContext<TagGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * TagGroup Root
 * -----------------------------------------------------------------------------------------------*/
type TagGroupRootProps = ComponentPropsWithRef<typeof TagGroupPrimitive> & {
  size?: "sm" | "md" | "lg";
};

const TagGroupRoot = ({children, className, size = "md", ...restProps}: TagGroupRootProps) => {
  const slots = useMemo(() => tagGroupVariants(), []);

  return (
    <TagGroupContext value={{slots, size}}>
      <TagGroupPrimitive className={slots.base({className})} data-slot="tag-group" {...restProps}>
        {children}
      </TagGroupPrimitive>
    </TagGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TagGroup List
 * -----------------------------------------------------------------------------------------------*/
type TagGroupListProps = ComponentPropsWithRef<typeof TagListPrimitive> & {};

const TagGroupList = ({children, className, ...restProps}: TagGroupListProps) => {
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
