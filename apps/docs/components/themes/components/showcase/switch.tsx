import {cloneElement} from "react";
import {SwitchProps, Switch} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";

type Color = SwitchProps["color"];

const SectionBase = ({color, isDisabled}: {color?: Color; isDisabled?: boolean}) => {
  return (
    <Switch defaultSelected aria-label="Automatic updates" color={color} isDisabled={isDisabled} />
  );
};

const Section = ({color}: {color: Color}) => {
  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, isDisabled: true})}
    </div>
  );
};

export const SwitchComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <ShowcaseComponent name="Chip">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} />
      ))}
    </ShowcaseComponent>
  );
};
