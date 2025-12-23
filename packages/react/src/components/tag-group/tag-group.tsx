"use client";

import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext, useMemo} from "react";
import {
  FormContext,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {tagGroupVariants} from "./tag-group.styles";

/* -------------------------------------------------------------------------------------------------
 * TagGroup Context
 * -----------------------------------------------------------------------------------------------*/
type TagGroupContext = {
  slots?: ReturnType<typeof tagGroupVariants>;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "surface";
  isOnSurface?: boolean;
  isOnFormField?: boolean;
};

const TagGroupContext = createContext<TagGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * TagGroup Root
 * -----------------------------------------------------------------------------------------------*/
type TagGroupRootProps = ComponentPropsWithRef<typeof TagGroupPrimitive> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "surface";
  isOnSurface?: boolean;
  isOnFormField?: boolean;
};

const TagGroupRoot = ({
  children,
  className,
  isOnFormField,
  isOnSurface,
  size,
  variant,
  ...restProps
}: TagGroupRootProps) => {
  const slots = useMemo(() => tagGroupVariants(), []);

  const surfaceContext = useContext(SurfaceContext);

  const formContext = useContext(FormContext);

  const isOnSurfaceValue = useMemo(
    () => isOnSurface ?? (surfaceContext.variant !== undefined ? true : false),
    [isOnSurface, surfaceContext.variant],
  );

  const isOnFormFieldValue = useMemo(
    () => isOnFormField ?? (formContext !== null ? true : false),
    [isOnFormField, formContext],
  );

  return (
    <TagGroupContext
      value={{
        slots,
        size,
        variant,
        isOnSurface: isOnSurfaceValue,
        isOnFormField: isOnFormFieldValue,
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
