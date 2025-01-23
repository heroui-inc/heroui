import {cloneElement} from "react";
import {PaginationProps, Pagination} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = PaginationProps["color"];
type Radius = PaginationProps["radius"];
type Variant = PaginationProps["variant"];

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
    <Pagination
      color={color}
      initialPage={1}
      isDisabled={isDisabled}
      radius={radius}
      total={10}
      variant={variant}
    />
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["flat", "bordered", "faded", "light"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false, radius}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "flat", isDisabled: true, radius})}
    </div>
  );
};

export const PaginationComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Pagination">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
