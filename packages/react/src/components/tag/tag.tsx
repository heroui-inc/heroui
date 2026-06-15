"use client";

import type {TagVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components/Button";

import {tagVariants} from "@heroui/styles";
import React, {Children, createContext, memo, useContext, useMemo} from "react";
import {Tag as TagPrimitive} from "react-aria-components/TagGroup";

import {pickChildren} from "../../utils/children";
import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {TagGroupContext} from "../tag-group";

/* -------------------------------------------------------------------------------------------------
 * Tag Context
 * -----------------------------------------------------------------------------------------------*/
type TagContext = {
  removeButtonClassName?: string;
};

const TagContext = createContext<TagContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tag Root
 * -----------------------------------------------------------------------------------------------*/
interface TagRootProps extends ComponentPropsWithRef<typeof TagPrimitive>, TagVariants {}

const TagRoot = memo(function TagRoot({children, className, ...restProps}: TagRootProps) {
  const {size, variant} = useContext(TagGroupContext);

  const slots = useMemo(() => tagVariants({size, variant}), [size, variant]);
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName),
    [className, baseClassName],
  );
  const removeButtonClassName = useMemo(() => slots.removeButton(), [slots]);

  const textValue = useMemo(() => {
    if (typeof children === "string") {
      return children;
    }

    if (typeof children === "object") {
      return Children.toArray(children)
        .filter((node) => typeof node === "string")
        .at(0);
    }

    return undefined;
  }, [children]);

  const [childrenWithoutRemoveButton, removeButtonChildren] = useMemo(() => {
    if (typeof children === "function") {
      return [children, undefined];
    }

    return pickChildren(children, TagRemoveButton);
  }, [children]);

  return (
    <TagPrimitive
      className={resolvedClassName}
      data-slot="tag"
      textValue={textValue}
      {...restProps}
    >
      {(renderProps) => (
        <TagContext value={{removeButtonClassName}}>
          {typeof children === "function" ? (
            children(renderProps)
          ) : (
            <>
              {childrenWithoutRemoveButton}
              {!!renderProps.allowsRemoving &&
                (removeButtonChildren && removeButtonChildren.length > 0 ? (
                  removeButtonChildren
                ) : (
                  <TagRemoveButton />
                ))}
            </>
          )}
        </TagContext>
      )}
    </TagPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tag Remove Button
 * -----------------------------------------------------------------------------------------------*/
type TagRemoveButtonProps = ComponentPropsWithRef<typeof ButtonPrimitive> & {
  children?: React.ReactNode;
};

const TagRemoveButton = memo(function TagRemoveButton({
  children,
  className,
  ...restProps
}: TagRemoveButtonProps) {
  const {removeButtonClassName} = useContext(TagContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, removeButtonClassName),
    [className, removeButtonClassName],
  );

  return (
    <CloseButton
      aria-label="Remove tag"
      className={resolvedClassName}
      data-slot="tag-remove-button"
      slot="remove"
      {...restProps}
    >
      {children}
    </CloseButton>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagRoot, TagRemoveButton};

export type {TagRootProps, TagRemoveButtonProps};
