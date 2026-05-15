import {Button, Tooltip} from "@heroui/react";

export function TooltipWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">带箭头</Button>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <p>带箭头指示器的工具提示</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button variant="primary">自定义偏移</Button>
        <Tooltip.Content showArrow offset={12}>
          <Tooltip.Arrow />
          <p>与触发器的自定义偏移</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
