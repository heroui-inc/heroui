import {cloneElement} from "react";
import {ChipProps, Chip as HeroUIChip} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = ChipProps["color"];
type Radius = ChipProps["radius"];
type Variant = ChipProps["variant"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
  variant,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
  variant?: Variant;
}) => {
  return (
    <HeroUIChip
      key={radius}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      {color}
    </HeroUIChip>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false, radius}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "solid", isDisabled: true, radius})}
    </div>
  );
};

export const Chip = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Chip">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
