import {cloneElement} from "react";
import {AvatarProps, Avatar as HeroUIAvatar} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";
import {getClassName} from "../../utils/shared";

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
}: {
  color: Color;
  radius: Radius;
  scaling: HeroUIScaling;
}) => {
  const className = getClassName(scaling, 10, 10);

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius, className, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, radius, className, isDisabled: true})}
    </div>
  );
};

export const Avatar = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Avatar">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
