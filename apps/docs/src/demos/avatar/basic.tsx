"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          alt="Blue"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>
    </div>
  );
}
