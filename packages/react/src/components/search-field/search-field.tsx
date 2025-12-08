"use client";

import type {SearchFieldVariants} from "./search-field.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Group as GroupPrimitive,
  Input as InputPrimitive,
  SearchField as SearchFieldPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {IconSearch} from "../icons";
import {SurfaceContext} from "../surface";

import {searchFieldVariants} from "./search-field.styles";

/* -------------------------------------------------------------------------------------------------
 * SearchField Context
 * -----------------------------------------------------------------------------------------------*/
type SearchFieldContext = {
  slots?: ReturnType<typeof searchFieldVariants>;
};

const SearchFieldContext = createContext<SearchFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * SearchField Root
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldRootProps
  extends ComponentPropsWithRef<typeof SearchFieldPrimitive>,
    SearchFieldVariants {}

const SearchFieldRoot = ({children, className, isOnSurface, ...props}: SearchFieldRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  const slots = React.useMemo(
    () => searchFieldVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  return (
    <SearchFieldContext value={{slots}}>
      <SearchFieldPrimitive
        data-slot="search-field"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SearchFieldPrimitive>
    </SearchFieldContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Group
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const SearchFieldGroup = ({children, className, ...props}: SearchFieldGroupProps) => {
  const {slots} = useContext(SearchFieldContext);

  return (
    <GroupPrimitive
      className={composeTwRenderProps(className, slots?.group())}
      data-slot="search-field-group"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </GroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Input
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {
  isOnSurface?: boolean;
}

const SearchFieldInput = ({className, isOnSurface, ...props}: SearchFieldInputProps) => {
  const {slots} = useContext(SearchFieldContext);
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input({isOnSurface: isOnSurfaceValue}))}
      data-slot="search-field-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Search Icon
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldSearchIconProps extends ComponentPropsWithRef<"svg"> {
  children?: React.ReactNode;
}

const SearchFieldSearchIcon = ({children, className, ...props}: SearchFieldSearchIconProps) => {
  const {slots} = useContext(SearchFieldContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: string;
      }>,
      {
        ...props,
        className: slots?.searchIcon({className}),
        "data-slot": "search-field-search-icon",
      },
    );
  }

  return (
    <IconSearch
      className={slots?.searchIcon({className})}
      data-slot="search-field-search-icon"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldClearButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const SearchFieldClearButton = ({className, ...props}: SearchFieldClearButtonProps) => {
  const {slots} = useContext(SearchFieldContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.clearButton())}
      data-slot="search-field-clear-button"
      slot="clear"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  SearchFieldRoot,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  SearchFieldClearButton,
};

export type {
  SearchFieldRootProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
};
