import {Button, TooltipArrow, TooltipContent, TooltipRoot} from "@heroui/react";

export function TooltipWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <TooltipRoot delay={0}>
        <Button variant="secondary">With Arrow</Button>
        <TooltipContent showArrow>
          <TooltipArrow />
          <p>Tooltip with arrow indicator</p>
        </TooltipContent>
      </TooltipRoot>

      <TooltipRoot delay={0}>
        <Button variant="primary">Custom Offset</Button>
        <TooltipContent showArrow offset={12}>
          <TooltipArrow />
          <p>Custom offset from trigger</p>
        </TooltipContent>
      </TooltipRoot>
    </div>
  );
}
