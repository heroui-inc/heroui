"use client";

import type {TagVariants} from "./tag.styles";
import type {ComponentPropsWithRef} from "react";
import type {Button as ButtonPrimitive} from "react-aria-components";

import {Children, createContext, useContext, useMemo} from "react";
import {Tag as TagPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {SurfaceContext} from "../surface";
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
interface TagRootProps extends ComponentPropsWithRef<typeof TagPrimitive>, TagVariants {}

const TagRoot = ({children, className, inSurface, ...restProps}: TagRootProps) => {
  const {size, variant} = useContext(TagGroupContext);
  const surfaceContext = useContext(SurfaceContext);
  const resolvedInSurface = inSurface ?? surfaceContext.variant;

  const slots = useMemo(
    () => tagVariants({size, variant, inSurface: resolvedInSurface}),
    [size, variant, resolvedInSurface],
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
