import {cloneElement} from "react";
import {
  BreadcrumbsProps,
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem as HeroUIBreadcrumbsItem,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";

type Color = BreadcrumbsProps["color"];

const SectionBase = ({
  color,
  variant,
  isDisabled,
}: {
  color?: BreadcrumbsProps["color"];
  variant?: BreadcrumbsProps["variant"];
  isDisabled?: boolean;
}) => {
  return (
    <HeroUIBreadcrumbs color={color} isDisabled={isDisabled} variant={variant}>
      <HeroUIBreadcrumbsItem>Home</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Music</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Artist</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Album</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Song</HeroUIBreadcrumbsItem>
    </HeroUIBreadcrumbs>
  );
};

const Section = ({color}: {color: Color}) => {
  const variants = ["bordered", "light", "solid", "solid"];
  const disabled = [false, false, false, true];

  return (
    <div className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color: color, variant, isDisabled: disabled[idx]}),
      )}
    </div>
  );
};

export const BreadCrumbs = () => {
  const colors: Color[] = ["foreground", "primary", "secondary", "success", "warning", "danger"];

  return (
    <ShowcaseComponent name="BreadCrumbs">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} />
      ))}
    </ShowcaseComponent>
  );
};
