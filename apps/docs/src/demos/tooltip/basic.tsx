"use client";

import {Button, TooltipContent, TooltipRoot} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TooltipBasic() {
  return (
    <div className="flex items-center gap-4">
      <TooltipRoot delay={0}>
        <Button variant="secondary">Hover me</Button>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </TooltipRoot>

      <TooltipRoot delay={0}>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:circle-info" />
        </Button>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </TooltipRoot>
    </div>
  );
}
