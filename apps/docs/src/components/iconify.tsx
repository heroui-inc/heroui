"use client";

import type {IconProps} from "@iconify/react";

import {Icon} from "@iconify/react";
import {Icon as OfflineIcon} from "@iconify/react/dist/offline";
import gravityIcons from "@iconify-json/gravity-ui/icons.json";
import {forwardRef} from "react";

export type IconifyProps = IconProps & {
  icon?: IconProps["icon"] | string;
};

const Iconify = forwardRef<SVGSVGElement, IconifyProps>(({icon: iconProp, ...props}, ref) => {
  // Check if it's a gravity-ui icon (no prefix or explicitly in gravity icons)
  const isGravityIcon =
    typeof iconProp === "string" && (iconProp in gravityIcons.icons || !iconProp.includes(":"));

  if (isGravityIcon && typeof iconProp === "string") {
    // Use offline version with gravity-ui icons
    const gravityIconData = gravityIcons.icons[iconProp as keyof typeof gravityIcons.icons];

    if (gravityIconData) {
      return <OfflineIcon {...props} ref={ref} icon={gravityIconData} />;
    }
  }

  // Use online version for other icon sets (like simple-icons:vite, lineicons:nextjs)
  return <Icon {...props} ref={ref} icon={iconProp} />;
});

Iconify.displayName = "HeroUI.Iconify";

export {Iconify};
