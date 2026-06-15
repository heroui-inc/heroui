"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SearchFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {searchFieldVariants} from "@heroui/styles";
import React, {createContext, isValidElement, memo, useContext, useMemo} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {SearchField as SearchFieldPrimitive} from "react-aria-components/SearchField";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {IconSearch} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * SearchField Context
 * -----------------------------------------------------------------------------------------------*/
type SearchFieldContext = {
  clearButtonClassName?: string;
  groupClassName?: string;
  inputClassName?: string;
  searchIconClassName?: string;
};

const SearchFieldContext = createContext<SearchFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * SearchField Root
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldRootProps
  extends ComponentPropsWithRef<typeof SearchFieldPrimitive>, SearchFieldVariants {}

const SearchFieldRoot = memo(function SearchFieldRoot({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: SearchFieldRootProps) {
  const slots = useMemo(() => searchFieldVariants({fullWidth, variant}), [fullWidth, variant]);
  const contextValue = useMemo<SearchFieldContext>(
    () => ({
      clearButtonClassName: slots.clearButton(),
      groupClassName: slots.group(),
      inputClassName: slots.input(),
      searchIconClassName: slots.searchIcon(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <SearchFieldContext value={contextValue}>
      <SearchFieldPrimitive
        data-slot="search-field"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </SearchFieldPrimitive>
    </SearchFieldContext>
  );
});

SearchFieldRoot.displayName = "HeroUI.SearchField";

/* -------------------------------------------------------------------------------------------------
 * SearchField Group
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const SearchFieldGroup = memo(function SearchFieldGroup({
  children,
  className,
  ...props
}: SearchFieldGroupProps) {
  const {groupClassName} = useContext(SearchFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, groupClassName),
    [className, groupClassName],
  );

  return (
    <GroupPrimitive className={resolvedClassName} data-slot="search-field-group" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </GroupPrimitive>
  );
});

SearchFieldGroup.displayName = "HeroUI.SearchField.Group";

/* -------------------------------------------------------------------------------------------------
 * SearchField Input
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const SearchFieldInput = memo(function SearchFieldInput({
  className,
  ...props
}: SearchFieldInputProps) {
  const {inputClassName} = useContext(SearchFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputClassName),
    [className, inputClassName],
  );

  return <InputPrimitive className={resolvedClassName} data-slot="search-field-input" {...props} />;
});

SearchFieldInput.displayName = "HeroUI.SearchField.Input";

/* -------------------------------------------------------------------------------------------------
 * SearchField Search Icon
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldSearchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const SearchFieldSearchIcon = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: SearchFieldSearchIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SearchFieldSearchIconProps<E>>) => {
  const {searchIconClassName} = useContext(SearchFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, searchIconClassName),
    [className, searchIconClassName],
  );

  if (children && isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: string;
      }>,
      {
        ...(props as any),
        className: resolvedClassName,
        "data-slot": "search-field-search-icon",
      },
    );
  }

  return (
    <IconSearch
      className={resolvedClassName}
      data-slot="search-field-search-icon"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldClearButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const SearchFieldClearButton = memo(function SearchFieldClearButton({
  className,
  ...props
}: SearchFieldClearButtonProps) {
  const {clearButtonClassName} = useContext(SearchFieldContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, clearButtonClassName),
    [className, clearButtonClassName],
  );

  return (
    <CloseButton
      className={resolvedClassName}
      data-slot="search-field-clear-button"
      slot="clear"
      {...props}
    />
  );
});

SearchFieldClearButton.displayName = "HeroUI.SearchField.ClearButton";

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
