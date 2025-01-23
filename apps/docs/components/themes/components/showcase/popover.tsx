import {cloneElement} from "react";
import {PopoverProps, Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = PopoverProps["color"];
type Radius = PopoverProps["radius"];

const SectionBase = ({color, radius}: {color?: Color; radius?: Radius}) => {
  return (
    <Popover color={color} placement="right" radius={radius}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius})}
    </div>
  );
};

export const PopoverComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();

  return (
    <ShowcaseComponent name="Popover">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radiusValue} />
      ))}
    </ShowcaseComponent>
  );
};
