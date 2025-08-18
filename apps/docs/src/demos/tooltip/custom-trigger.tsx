"use client";

import {Tooltip, Avatar, Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TooltipCustomTrigger() {
  return (
    <div className="flex items-center gap-6">
      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="User avatar">
          <Avatar>
            <Avatar.Image 
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=1" 
              alt="John Doe"
            />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">John Doe</p>
            <p className="text-muted text-xs">john@example.com</p>
          </div>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="Status chip">
          <Chip color="success">
            <Icon icon="gravity-ui:circle-check-fill" width={12} />
            Active
          </Chip>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>User is currently online</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="Info icon">
          <div className="bg-accent-soft rounded-full p-2">
            <Icon icon="gravity-ui:circle-question" className="text-accent" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          <div className="max-w-xs">
            <p className="mb-1 font-semibold">Help Information</p>
            <p className="text-muted text-sm">
              This is a helpful tooltip with more detailed information about this feature.
            </p>
          </div>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}