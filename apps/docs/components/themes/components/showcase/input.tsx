import {cloneElement} from "react";
import {InputProps, Input} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = InputProps["color"];
type Radius = InputProps["radius"];
type Variant = InputProps["variant"];

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
    <Input
      color={color}
      isDisabled={isDisabled}
      label="Email"
      radius={radius}
      type="email"
      variant={variant}
    />
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["flat", "bordered", "faded", "underlined"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false, radius}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "flat", isDisabled: true, radius})}
    </div>
  );
};

export const InputComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Input">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
