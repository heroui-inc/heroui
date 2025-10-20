"use client";

import {Button, Tooltip, TooltipContent} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TooltipBasic() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">Hover me</Button>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:circle-info" />
        </Button>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
