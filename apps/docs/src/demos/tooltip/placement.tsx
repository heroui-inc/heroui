"use client";

import {Button, Tooltip, TooltipArrow, TooltipContent} from "@heroui/react";

export function TooltipPlacement() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div />
      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Top
        </Button>
        <TooltipContent showArrow placement="top">
          <TooltipArrow />
          <p>Top placement</p>
        </TooltipContent>
      </Tooltip>
      <div />

      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Left
        </Button>
        <TooltipContent showArrow placement="left">
          <TooltipArrow />
          <p>Left placement</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center justify-center">
        <span className="text-muted text-sm">Hover buttons</span>
      </div>

      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Right
        </Button>
        <TooltipContent showArrow placement="right">
          <TooltipArrow />
          <p>Right placement</p>
        </TooltipContent>
      </Tooltip>

      <div />
      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Bottom
        </Button>
        <TooltipContent showArrow placement="bottom">
          <TooltipArrow />
          <p>Bottom placement</p>
        </TooltipContent>
      </Tooltip>
      <div />
    </div>
  );
}
