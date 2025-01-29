import {cloneElement} from "react";
import {InputProps, Input} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {HeroUIScaling} from "../../types";

type Color = InputProps["color"];
type Radius = InputProps["radius"];
type Variant = InputProps["variant"];

const SectionBase = ({
  color,
  isDisabled,
  radius,
  variant,
  classNames,
}: {
  color?: Color;
  isDisabled?: boolean;
  radius?: Radius;
  variant?: Variant;
  classNames?: any;
}) => {
  return (
    <Input
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      label="Input"
      radius={radius}
      variant={variant}
    />
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
  const variants = ["flat", "bordered", "faded", "underlined"];
  let classNames = {base: "h-10 w-[340px]", label: "text-small"};

  switch (scaling) {
    case 90: {
      classNames = {base: "h-8 w-[300px]", label: "text-tiny"};
      break;
    }
    case 95: {
      classNames = {base: "h-8 w-[320px]", label: "text-tiny"};
      break;
    }
    case 100: {
      classNames = {base: "h-10 w-[340px]", label: "text-small"};
      break;
    }
    case 105: {
      classNames = {base: "h-12 w-[360px]", label: "text-medium"};
      break;
    }
    case 110: {
      classNames = {base: "h-12 w-[380px]", label: "text-medium"};
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {
          color,
          variant,
          classNames,
          isDisabled: false,
          radius,
        }),
      )}
      {cloneElement(<SectionBase />, {
        color,
        classNames,
        variant: "flat",
        isDisabled: true,
        radius,
      })}
    </div>
  );
};

export const InputComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Input">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
