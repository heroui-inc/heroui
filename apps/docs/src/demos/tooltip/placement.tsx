"use client";

import {Tooltip, Button} from "@heroui/react";

export function TooltipPlacement() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div></div>
      <Tooltip delay={0}>
        <Button variant="tertiary" className="w-full">Top</Button>
        <Tooltip.Content placement="top" showArrow>
          <Tooltip.Arrow />
          <p>Top placement</p>
        </Tooltip.Content>
      </Tooltip>
      <div></div>

      <Tooltip delay={0}>
        <Button variant="tertiary" className="w-full">Left</Button>
        <Tooltip.Content placement="left" showArrow>
          <Tooltip.Arrow />
          <p>Left placement</p>
        </Tooltip.Content>
      </Tooltip>
      
      <div className="flex items-center justify-center">
        <span className="text-muted text-sm">Hover buttons</span>
      </div>

      <Tooltip delay={0}>
        <Button variant="tertiary" className="w-full">Right</Button>
        <Tooltip.Content placement="right" showArrow>
          <Tooltip.Arrow />
          <p>Right placement</p>
        </Tooltip.Content>
      </Tooltip>

      <div></div>
      <Tooltip delay={0}>
        <Button variant="tertiary" className="w-full">Bottom</Button>
        <Tooltip.Content placement="bottom" showArrow>
          <Tooltip.Arrow />
          <p>Bottom placement</p>
        </Tooltip.Content>
      </Tooltip>
      <div></div>
    </div>
  );
}