"use client";

import type {TagVariants} from "../tag";
import type {ComponentPropsWithRef} from "react";

import {tagGroupVariants} from "@heroui/styles";
import React, {createContext, use, useMemo} from "react";
import {
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
} from "react-aria-components/TagGroup";

import {composeTwRenderProps} from "../../utils/compose";
import {FieldSlotsGate} from "../../utils/field-slots-gate";

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
    <FieldSlotsGate>
      <TagGroupContext value={{slots, size, variant}}>
        <TagGroupPrimitive className={slots.base({className})} data-slot="tag-group" {...restProps}>
          {children}
        </TagGroupPrimitive>
      </TagGroupContext>
    </FieldSlotsGate>
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
  const {slots} = use(TagGroupContext);

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
