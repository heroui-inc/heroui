import {cloneElement} from "react";
import {Alert as HeroUIAlert, AlertProps} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = AlertProps["color"];
type Radius = AlertProps["radius"];
type Variant = AlertProps["variant"];

const SectionBase = ({
  color,
  variant,
  radius,
}: {
  color?: Color;
  variant?: Variant;
  radius?: Radius;
}) => {
  return <HeroUIAlert color={color} radius={radius} title={"Default Alert"} variant={variant} />;
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["bordered", "light", "solid", "solid"];

  return (
    <div className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, radius}),
      )}
    </div>
  );
};

export const Alert = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Alert">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
