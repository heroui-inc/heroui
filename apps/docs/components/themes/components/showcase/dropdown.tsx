import {cloneElement} from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownMenuProps,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";

type Color = DropdownMenuProps["color"];
type Variant = DropdownMenuProps["variant"];

const SectionBase = ({
  color,
  isDisabled,
  variant,
}: {
  color?: Color;
  isDisabled?: boolean;
  variant?: Variant;
}) => {
  return (
    <Dropdown isDisabled={isDisabled}>
      <DropdownTrigger>
        <Button color={color} variant={variant}>
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" color={color} variant={variant}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Section = ({color}: {color: Color}) => {
  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

  return (
    <div key={color} className="flex flex-col gap-y-4">
      {variants.map((variant, idx) =>
        cloneElement(<SectionBase key={idx} />, {color, variant, isDisabled: false}),
      )}
      {cloneElement(<SectionBase />, {color, variant: "solid", isDisabled: true})}
    </div>
  );
};

export const DropdownComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <ShowcaseComponent name="Dropdown">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} />
      ))}
    </ShowcaseComponent>
  );
};
