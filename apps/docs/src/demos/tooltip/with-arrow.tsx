"use client";

import {Tooltip, Button} from "@heroui/react";

export function TooltipWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">With Arrow</Button>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <p>Tooltip with arrow indicator</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button variant="primary">Custom Offset</Button>
        <Tooltip.Content showArrow offset={12}>
          <Tooltip.Arrow />
          <p>Custom offset from trigger</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}