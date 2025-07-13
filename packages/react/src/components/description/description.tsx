"use client";

import type {DescriptionVariants} from "./description.styles";
import type {TextProps} from "react-aria-components";

import React from "react";
import {Text} from "react-aria-components";

import {descriptionVariants} from "./description.styles";

interface DescriptionProps extends TextProps, DescriptionVariants {
  ref?: React.Ref<HTMLElement>;
}

const Description = React.forwardRef<React.ElementRef<typeof Text>, DescriptionProps>(
  ({children, className, disabled, size, ...rest}, ref) => {
    return (
      <Text
        ref={ref}
        className={descriptionVariants({size, disabled, className})}
        data-slot="description"
        slot="description"
        {...rest}
      >
        {children}
      </Text>
    );
  },
);

Description.displayName = "HeroUI.Description";

export type {DescriptionProps};
export {Description};
