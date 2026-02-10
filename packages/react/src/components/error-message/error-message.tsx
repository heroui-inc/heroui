"use client";

import type {ErrorMessageVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components";

import {errorMessageVariants} from "@heroui/styles";
import {Text} from "react-aria-components";

/* -------------------------------------------------------------------------------------------------
 * Error Message Root
 * -----------------------------------------------------------------------------------------------*/
interface ErrorMessageRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, ErrorMessageVariants {}

const ErrorMessageRoot = ({children, className, ...rest}: ErrorMessageRootProps) => {
  return (
    <Text
      className={errorMessageVariants({className})}
      data-slot="error-message"
      slot="errorMessage"
      {...rest}
    >
      {children}
    </Text>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ErrorMessageRoot};

export type {ErrorMessageRootProps};
