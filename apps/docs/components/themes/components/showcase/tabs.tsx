import {cloneElement} from "react";
import {TabsProps, Tabs, Tab} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = TabsProps["color"];
type Radius = TabsProps["radius"];
type Variant = TabsProps["variant"];

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
    <Tabs
      key={color}
      aria-label="Tabs colors"
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      <Tab key="photos" title="Photos" />
      <Tab key="music" title="Music" />
      <Tab key="videos" title="Videos" />
    </Tabs>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  const variants = ["solid", "bordered", "light", "underlined"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false, radius}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "solid", isDisabled: true, radius})}
    </div>
  );
};

export const TabsComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Tabs">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
