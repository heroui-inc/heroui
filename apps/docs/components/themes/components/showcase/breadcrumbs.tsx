import {cloneElement} from "react";
import {
  BreadcrumbsProps,
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem as HeroUIBreadcrumbsItem,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = BreadcrumbsProps["color"];

const SectionBase = ({
  color,
  variant,
  isDisabled,
  className,
}: {
  color?: BreadcrumbsProps["color"];
  variant?: BreadcrumbsProps["variant"];
  isDisabled?: boolean;
  className?: string;
}) => {
  return (
    <HeroUIBreadcrumbs
      className={className}
      color={color}
      isDisabled={isDisabled}
      variant={variant}
    >
      <HeroUIBreadcrumbsItem>Home</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Music</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Artist</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Album</HeroUIBreadcrumbsItem>
      <HeroUIBreadcrumbsItem>Song</HeroUIBreadcrumbsItem>
    </HeroUIBreadcrumbs>
  );
};

const Section = ({color, scaling}: {color: Color; scaling: number}) => {
  const variants = ["bordered", "light", "solid"];
  const disabled = [false, false, false, true];
  let className = "text-small";

  switch (scaling) {
    case 90: {
      className = "text-[0.7rem]";
      break;
    }
    case 95: {
      className = "text-tiny";
      break;
    }
    case 100: {
      className = "text-small p-0.5";
      break;
    }
    case 105: {
      className = "text-medium p-1";
      break;
    }
    case 110: {
      className = "text-large p-1.5";
      break;
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {
          color: color,
          variant,
          className,
          isDisabled: disabled[idx],
        }),
      )}
    </div>
  );
};

export const BreadCrumbs = () => {
  const colors: Color[] = ["foreground", "primary", "secondary", "success", "warning", "danger"];
  const {scaling} = useThemeBuilder();

  return (
    <ShowcaseComponent name="BreadCrumbs">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
