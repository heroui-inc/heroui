"use client";

import type {DescriptionVariants} from "./description.styles";
import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components";

import {Text} from "react-aria-components";

import {descriptionVariants} from "./description.styles";

/* -------------------------------------------------------------------------------------------------
 * Description Root
 * -----------------------------------------------------------------------------------------------*/
interface DescriptionRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, DescriptionVariants {}

const DescriptionRoot = ({children, className, ...rest}: DescriptionRootProps) => {
  return (
    <Text
      className={descriptionVariants({className})}
      data-slot="description"
      slot="description"
      {...rest}
    >
      {children}
    </Text>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DescriptionRoot};

export type {DescriptionRootProps};
