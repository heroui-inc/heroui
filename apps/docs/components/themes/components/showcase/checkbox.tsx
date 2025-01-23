import {cloneElement} from "react";
import {CheckboxProps, Checkbox as HeroUICheckbox} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = CheckboxProps["color"];
type Radius = CheckboxProps["radius"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
}) => {
  return (
    <HeroUICheckbox
      key={radius}
      defaultSelected
      color={color}
      isDisabled={isDisabled}
      radius={radius}
    >
      {color}
    </HeroUICheckbox>
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

export const Checkbox = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Checkbox">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
