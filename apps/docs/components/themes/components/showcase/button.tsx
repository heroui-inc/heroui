import {cloneElement} from "react";
import {ButtonProps, Button as HeroUIButton} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";
import {Border} from "../../types";

type Color = ButtonProps["color"];
type Radius = ButtonProps["radius"];
type Variant = ButtonProps["variant"];

const SectionBase = ({
  color,
  radius,
  isDisabled,
  variant,
  className,
}: {
  color?: Color;
  radius?: Radius;
  isDisabled?: boolean;
  variant?: Variant;
  className?: string;
}) => {
  return (
    <HeroUIButton
      key={color}
      className={className}
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      variant={variant}
    >
      {color}
    </HeroUIButton>
  );
};

const Section = ({
  color,
  radius,
  scaling,
  borderWidthValue,
}: {
  color: Color;
  radius: Radius;
  scaling: number;
  borderWidthValue: Border;
}) => {
  const variants = ["solid", "shadow", "bordered", "flat", "faded", "ghost"];
  let className = "px-6 min-w-16 h-10 text-small";

  let borderClass = "border-medium";

  if (borderWidthValue === "thin") {
    borderClass = "border-small";
  } else if (borderWidthValue === "thick") {
    borderClass = "border-large";
  }

  switch (scaling) {
    case 90: {
      className = clsx("px-4 min-w-12 h-8 text-[0.7rem]");
      break;
    }
    case 95: {
      className = "px-5 min-w-14 h-9 text-tiny";
      break;
    }
    case 100: {
      className = "px-6 min-w-16 h-10 text-small";
      break;
    }
    case 105: {
      className = "px-7 min-w-18 h-11 text-medium";
      break;
    }
    case 110: {
      className = "px-8 min-w-20 h-12 text-medium";
      break;
    }
  }

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant) =>
        cloneElement(<SectionBase />, {
          color,
          radius,
          className: clsx(
            className,
            variant === "bordered" || variant === "faded" || variant === "ghost" ? borderClass : "",
          ),
          isDisabled: false,
          variant,
        }),
      )}
      {cloneElement(<SectionBase />, {
        color,
        radius,
        className,
        isDisabled: true,
        variant: "solid",
      })}
    </div>
  );
};

export const Button = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue, scaling, borderWidthValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Button">
      {colors.map((color, idx) => (
        <Section
          key={idx}
          borderWidthValue={borderWidthValue}
          color={color}
          radius={radiusValue}
          scaling={scaling}
        />
      ))}
    </ShowcaseComponent>
  );
};
