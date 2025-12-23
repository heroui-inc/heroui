"use client";

import type {ComponentPropsWithRef} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components";

import {Children, createContext, useContext, useMemo} from "react";
import {Tag as TagPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {TagGroupContext} from "../tag-group";

import {tagVariants} from "./tag.styles";

/* -------------------------------------------------------------------------------------------------
 * Tag Context
 * -----------------------------------------------------------------------------------------------*/
type TagContext = {
  slots?: ReturnType<typeof tagVariants>;
};

const TagContext = createContext<TagContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tag Root
 * -----------------------------------------------------------------------------------------------*/
interface TagRootProps extends ComponentPropsWithRef<typeof TagPrimitive> {}

const TagRoot = ({children, className, ...restProps}: TagRootProps) => {
  const {isOnFormField, isOnSurface, size, variant} = useContext(TagGroupContext);

  const slots = useMemo(
    () => tagVariants({size, isOnSurface, isOnFormField, variant}),
    [size, isOnSurface, isOnFormField, variant],
  );

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

  return (
    <TagPrimitive
      className={composeTwRenderProps(className, slots.base())}
      data-slot="tag"
      textValue={textValue}
      {...restProps}
    >
      {(renderProps) => (
        <TagContext value={{slots}}>
          {typeof children === "function" ? (
            children(renderProps)
          ) : (
            <>
              {children}
              {!!renderProps.allowsRemoving && <TagRemoveButton />}
            </>
          )}
        </TagContext>
      )}
    </TagPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tag Remove Button
 * -----------------------------------------------------------------------------------------------*/
type TagRemoveButtonProps = ComponentPropsWithRef<typeof ButtonPrimitive> & {};

const TagRemoveButton = ({className, ...restProps}: TagRemoveButtonProps) => {
  const {slots} = useContext(TagContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.removeButton())}
      data-slot="tag-remove-button"
      slot="remove"
      {...restProps}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagRoot, TagRemoveButton};

export type {TagRootProps, TagRemoveButtonProps};
