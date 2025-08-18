"use client";

import {Popover, Avatar, Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PopoverCustomTrigger() {
  return (
    <div className="flex items-center gap-6">
      <Popover>
        <Popover.Trigger aria-label="User menu">
          <div className="flex cursor-pointer items-center gap-2 rounded-lg border p-2 hover:bg-surface">
            <Avatar size="sm">
              <Avatar.Image 
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=2" 
                alt="Jane Smith"
              />
              <Avatar.Fallback>JS</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Jane Smith</span>
              <span className="text-muted text-xs">Admin</span>
            </div>
            <Icon icon="gravity-ui:chevron-down" className="text-muted ml-2" width={16} />
          </div>
        </Popover.Trigger>
        <Popover.Content className="w-[200px]">
          <Popover.Dialog className="p-0">
            <div className="flex flex-col">
              <button className="hover:bg-surface px-3 py-2 text-left text-sm">Profile</button>
              <button className="hover:bg-surface px-3 py-2 text-left text-sm">Settings</button>
              <button className="hover:bg-surface px-3 py-2 text-left text-sm">Billing</button>
              <hr className="my-1" />
              <button className="hover:bg-surface px-3 py-2 text-left text-sm">Sign out</button>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger aria-label="Notification settings">
          <Chip color="accent">
            <Icon icon="gravity-ui:bell" width={12} />
            3 New
            <Icon icon="gravity-ui:chevron-down" width={12} />
          </Chip>
        </Popover.Trigger>
        <Popover.Content className="w-[300px]">
          <Popover.Dialog>
            <Popover.Heading>Notifications</Popover.Heading>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg border p-2">
                <p className="text-sm font-medium">New message from Alex</p>
                <p className="text-muted text-xs">2 minutes ago</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-sm font-medium">Your report is ready</p>
                <p className="text-muted text-xs">1 hour ago</p>
              </div>
              <div className="rounded-lg border p-2">
                <p className="text-sm font-medium">Meeting reminder</p>
                <p className="text-muted text-xs">3 hours ago</p>
              </div>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}