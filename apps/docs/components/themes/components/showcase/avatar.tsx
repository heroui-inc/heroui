import type {AvatarProps} from "@heroui/react";
import type {Border, HeroUIScaling} from "../../types";

import {cloneElement} from "react";
import {Avatar as HeroUIAvatar} from "@heroui/react";
import {cn} from "@heroui/theme";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {getBorderWidth} from "../../utils/shared";

type Color = AvatarProps["color"];
type Radius = AvatarProps["radius"];

const SectionBase = ({
  color,
  radius,
  isDisabled,
  className,
}: {
  color?: Color;
  radius?: Radius;
  isDisabled?: boolean;
  className?: string;
}) => {
  return (
    <HeroUIAvatar
      key={color}
      isBordered
      className={className}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
    >
      {color}
    </HeroUIAvatar>
  );
};

const Section = ({
  color,
  radius,
  scaling,
  borderWidthValue,
}: {
  color: Color;
  radius: Radius;
  scaling: HeroUIScaling;
  borderWidthValue: Border;
}) => {
  let className = "h-10 w-10";
  const border = getBorderWidth(borderWidthValue);
  const borderClassName = border <= 2 ? `ring-${border} ring-offset-2` : `ring ring-offset-2`;

  switch (scaling) {
    case 90: {
      className = cn("h-6 w-6", borderClassName) as string;
      break;
    }
    case 95: {
      className = cn("h-8 w-8", borderClassName) as string;
      break;
    }
    case 100: {
      className = cn("h-10 w-10", borderClassName) as string;
      break;
    }
    case 105: {
      className = cn("h-12 w-12", borderClassName) as string;
      break;
    }
    case 110: {
      className = cn("h-14 w-14", borderClassName) as string;
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius, className, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, radius, className, isDisabled: true})}
    </div>
  );
};

export const Avatar = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Avatar">
      {colors.map((color, idx) => (
        <Section
          key={idx}
          borderWidthValue={borderWidthValue}
          color={color}
          radius={radiusValue}
          scaling={scaling}
        />
      ))}
    </ShowcaseComponent>
  );
};
