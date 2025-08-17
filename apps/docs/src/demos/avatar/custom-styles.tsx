"use client";

import {Avatar} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4">
      {/* Custom size with Tailwind classes */}
      <Avatar className="size-16">
        <Avatar.Image
          alt="Extra Large"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
        />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>

      {/* Square avatar */}
      <Avatar className="rounded-lg">
        <Avatar.Image
          alt="Square Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <Avatar.Fallback className="rounded-lg">SQ</Avatar.Fallback>
      </Avatar>

      {/* Gradient border */}
      <Avatar className="bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5">
        <div className="bg-background size-full rounded-full p-0.5">
          <Avatar.Image
            alt="Gradient Border"
            className="rounded-full"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
          />
          <Avatar.Fallback className="border-none">GB</Avatar.Fallback>
        </div>
      </Avatar>

      {/* Status indicator */}
      <div className="relative">
        <Avatar>
          <Avatar.Image
            alt="Online User"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8"
          />
          <Avatar.Fallback>ON</Avatar.Fallback>
        </Avatar>
        <span className="ring-background absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2" />
      </div>
    </div>
  );
}
