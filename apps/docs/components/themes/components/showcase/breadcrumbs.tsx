import {cloneElement} from "react";
import {
  BreadcrumbsProps,
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem as HeroUIBreadcrumbsItem,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {getBorderWidth} from "../../utils/shared";
import {Border} from "../../types";

type Color = BreadcrumbsProps["color"];

const SectionBase = ({
  color,
  variant,
  isDisabled,
  classNames,
}: {
  color?: BreadcrumbsProps["color"];
  variant?: BreadcrumbsProps["variant"];
  isDisabled?: boolean;
  classNames?: any;
}) => {
  const items = ["Home", "Music", "Artist", "Album", "Song"];

  return (
    <HeroUIBreadcrumbs
      classNames={classNames}
      color={color}
      isDisabled={isDisabled}
      variant={variant}
    >
      {items.map((item, index) => (
        <HeroUIBreadcrumbsItem key={index}>{item}</HeroUIBreadcrumbsItem>
      ))}
    </HeroUIBreadcrumbs>
  );
};

const Section = ({
  color,
  scaling,
  borderWidthValue,
}: {
  color: Color;
  scaling: number;
  borderWidthValue: Border;
}) => {
  const variants = ["bordered", "light", "solid"];
  const disabled = [false, false, false, true];
  let classNames = {base: "text-small"};

  const border = getBorderWidth(borderWidthValue);
  const borderClassName = `border-${border}`;

  switch (scaling) {
    case 90: {
      classNames = {base: "text-[0.7rem]"};
      break;
    }
    case 95: {
      classNames = {base: "text-tiny"};
      break;
    }
    case 100: {
      classNames = {base: "text-small p-0.5"};
      break;
    }
    case 105: {
      classNames = {base: "text-medium p-1"};
      break;
    }
    case 110: {
      classNames = {base: "text-large p-1.5"};
      break;
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {
          color: color,
          variant,
          classNames: {
            ...classNames,
            list: variant === "bordered" ? borderClassName : "",
          },
          isDisabled: disabled[idx],
        }),
      )}
    </div>
  );
};

export const BreadCrumbs = () => {
  const colors: Color[] = ["foreground", "primary", "secondary", "success", "warning", "danger"];
  const {scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="BreadCrumbs">
      {colors.map((color, idx) => (
        <Section key={idx} borderWidthValue={borderWidthValue} color={color} scaling={scaling} />
      ))}
    </ShowcaseComponent>
  );
};
