import {cloneElement} from "react";
import {ButtonProps, Button as HeroUIButton} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = ButtonProps["color"];
type Radius = ButtonProps["radius"];
type Variant = ButtonProps["variant"];

const SectionBase = ({
  color,
  radius,
  isDisabled,
  variant,
}: {
  color?: Color;
  radius?: Radius;
  isDisabled?: boolean;
  variant?: Variant;
}) => {
  return (
    <HeroUIButton
      key={color}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      {color}
    </HeroUIButton>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["solid", "shadow", "bordered", "flat", "faded", "ghost"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant) =>
        cloneElement(<SectionBase />, {color, radius, isDisabled: false, variant}),
      )}
      {cloneElement(<SectionBase />, {color, radius, isDisabled: true, variant: "solid"})}
    </div>
  );
};

export const Button = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Button">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
