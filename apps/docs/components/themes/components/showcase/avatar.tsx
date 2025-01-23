import {cloneElement} from "react";
import {AvatarProps, Avatar as HeroUIAvatar} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = AvatarProps["color"];
type Radius = AvatarProps["radius"];

const SectionBase = ({
  color,
  radius,
  isDisabled,
}: {
  color?: Color;
  radius?: Radius;
  isDisabled?: boolean;
}) => {
  return (
    <HeroUIAvatar
      key={color}
      isBordered
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
    >
      {color}
    </HeroUIAvatar>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, radius, isDisabled: true})}
    </div>
  );
};

export const Avatar = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Avatar">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
