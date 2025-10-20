"use client";

import type {DescriptionVariants} from "./description.styles";
import type {TextProps} from "react-aria-components";

import {Text} from "react-aria-components";

import {descriptionVariants} from "./description.styles";

interface DescriptionProps extends TextProps, DescriptionVariants {}

const Description = ({children, className, ...rest}: DescriptionProps) => {
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

export type {DescriptionProps};
export {Description};
