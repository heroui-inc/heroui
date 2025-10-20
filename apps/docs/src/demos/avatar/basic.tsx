"use client";

import {AvatarFallback, AvatarImage, AvatarRoot} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <AvatarRoot>
        <AvatarImage alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <AvatarFallback>JD</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot>
        <AvatarImage
          alt="Blue"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <AvatarFallback>B</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot>
        <AvatarFallback>JR</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
