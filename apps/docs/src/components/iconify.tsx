"use client";

import type {IconProps} from "@iconify/react/dist/offline";

import {Icon} from "@iconify/react/dist/offline";
import gravityIcons from "@iconify-json/gravity-ui/icons.json";
import {forwardRef} from "react";

export type IconifyProps = IconProps & {
  icon?: IconProps["icon"] | string;
};

const Iconify = forwardRef<SVGSVGElement, IconifyProps>(({icon: iconProp, ...props}, ref) => {
  // Default to gravity-ui icons
  const icon = gravityIcons.icons[iconProp as keyof typeof gravityIcons.icons] || iconProp;

  return <Icon {...props} ref={ref} icon={icon} />;
});

Iconify.displayName = "HeroUI.Iconify";

export {Iconify};
