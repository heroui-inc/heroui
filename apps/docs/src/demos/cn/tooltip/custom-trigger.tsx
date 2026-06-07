import {CircleCheckFill, CircleQuestion} from "@gravity-ui/icons";
import {Avatar, Chip, Tooltip} from "@heroui/react";

export function TooltipCustomTrigger() {
  return (
    <div className="flex items-center gap-6">
      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="用户头像">
          <Avatar size="sm">
            <Avatar.Image
              alt="Jane Doe"
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
            />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <div className="flex flex-col gap-0 py-1">
            <p className="font-semibold">Jane Doe</p>
            <p className="text-xs text-muted">jane@example.com</p>
          </div>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="状态标签">
          <Chip color="success">
            <CircleCheckFill width={12} />
            <Chip.Label>活跃</Chip.Label>
          </Chip>
        </Tooltip.Trigger>
        <Tooltip.Content className="flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <p>Jane 当前在线</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="信息图标">
          <div className="rounded-full bg-accent-soft p-2">
            <CircleQuestion className="text-accent" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <div className="max-w-xs px-1 py-1.5">
            <p className="mb-1 font-semibold">帮助信息</p>
            <p className="text-sm text-muted">这是包含有关此功能更详细信息的实用工具提示。</p>
          </div>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
