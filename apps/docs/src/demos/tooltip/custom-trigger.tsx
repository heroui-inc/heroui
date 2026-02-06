import {CircleCheckFill, CircleQuestion} from "@gravity-ui/icons";
import {Avatar, Chip, Tooltip} from "@heroui/react";

export function TooltipCustomTrigger() {
  return (
    <div className="flex items-center gap-6">
      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="User avatar">
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
        <Tooltip.Trigger aria-label="Status chip">
          <Chip color="success">
            <CircleCheckFill width={12} />
            <Chip.Label>Active</Chip.Label>
          </Chip>
        </Tooltip.Trigger>
        <Tooltip.Content className="flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <p>Jane is currently online</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="Info icon">
          <div className="rounded-full bg-accent-soft p-2">
            <CircleQuestion className="text-accent" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <div className="max-w-xs px-1 py-1.5">
            <p className="mb-1 font-semibold">Help Information</p>
            <p className="text-sm text-muted">
              This is a helpful tooltip with more detailed information about this feature.
            </p>
          </div>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
