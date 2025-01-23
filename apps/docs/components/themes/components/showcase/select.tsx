import {cloneElement} from "react";
import {SelectProps, Select, SelectItem} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = SelectProps["color"];
type Radius = SelectProps["radius"];
type Variant = SelectProps["variant"];

export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];

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
    <Select
      className="w-[300px]"
      color={color}
      isDisabled={isDisabled}
      label="Select an animal"
      radius={radius}
      variant={variant}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["flat", "faded", "bordered", "underlined"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false, radius}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "flat", isDisabled: true, radius})}
    </div>
  );
};

export const SelectComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Select">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
