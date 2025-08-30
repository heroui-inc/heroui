"use client";

import {Button, Tooltip} from "@heroui/react";

export function TooltipPlacement() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div />
      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Top
        </Button>
        <Tooltip.Content showArrow placement="top">
          <Tooltip.Arrow />
          <p>Top placement</p>
        </Tooltip.Content>
      </Tooltip>
      <div />

      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Left
        </Button>
        <Tooltip.Content showArrow placement="left">
          <Tooltip.Arrow />
          <p>Left placement</p>
        </Tooltip.Content>
      </Tooltip>

      <div className="flex items-center justify-center">
        <span className="text-muted text-sm">Hover buttons</span>
      </div>

      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Right
        </Button>
        <Tooltip.Content showArrow placement="right">
          <Tooltip.Arrow />
          <p>Right placement</p>
        </Tooltip.Content>
      </Tooltip>

      <div />
      <Tooltip delay={0}>
        <Button className="w-full" variant="tertiary">
          Bottom
        </Button>
        <Tooltip.Content showArrow placement="bottom">
          <Tooltip.Arrow />
          <p>Bottom placement</p>
        </Tooltip.Content>
      </Tooltip>
      <div />
    </div>
  );
}
