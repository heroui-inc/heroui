"use client";

import {Avatar, Button, Popover} from "@heroui/react";
import {useState} from "react";

export function PopoverInteractive() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Popover>
        <Popover.Trigger aria-label="User profile">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Sarah Johnson"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />
              <Avatar.Fallback>SJ</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-muted text-xs">@sarahj</p>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content className="w-[320px]">
          <Popover.Dialog>
            <Popover.Heading>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar size="md">
                    <Avatar.Image
                      alt="Sarah Johnson"
                      src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                    />
                    <Avatar.Fallback>SJ</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-muted text-sm">@sarahj</p>
                  </div>
                </div>
                <Button
                  className="rounded-full"
                  size="sm"
                  variant={isFollowing ? "tertiary" : "primary"}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </Popover.Heading>
            <p className="text-muted mt-3 text-sm">
              Product designer and creative director. Building beautiful experiences that matter.
            </p>
            <div className="mt-3 flex gap-4">
              <div>
                <span className="font-semibold">892</span>
                <span className="text-muted ml-1 text-sm">Following</span>
              </div>
              <div>
                <span className="font-semibold">12.5K</span>
                <span className="text-muted ml-1 text-sm">Followers</span>
              </div>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
