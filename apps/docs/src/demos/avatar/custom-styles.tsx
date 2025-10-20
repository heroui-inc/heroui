"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4">
      {/* Custom size with Tailwind classes */}
      <Avatar className="size-16">
        <AvatarImage alt="Extra Large" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>

      {/* Square avatar */}
      <Avatar className="rounded-lg">
        <AvatarImage
          alt="Square Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <AvatarFallback className="rounded-lg">SQ</AvatarFallback>
      </Avatar>

      {/* Gradient border */}
      <Avatar className="bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5">
        <div className="bg-background size-full rounded-full p-0.5">
          <AvatarImage
            alt="Gradient Border"
            className="rounded-full"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
          />
          <AvatarFallback className="border-none">GB</AvatarFallback>
        </div>
      </Avatar>

      {/* Status indicator */}
      <div className="relative">
        <Avatar>
          <AvatarImage
            alt="Online User"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8"
          />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <span className="ring-background absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2" />
      </div>
    </div>
  );
}
