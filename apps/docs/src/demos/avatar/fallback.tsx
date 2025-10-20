"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Fallback() {
  return (
    <div className="flex items-center gap-4">
      {/* Text fallback */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Icon fallback */}
      <Avatar>
        <AvatarFallback>
          <Icon icon="gravity-ui:person" />
        </AvatarFallback>
      </Avatar>

      {/* Fallback with delay */}
      <Avatar>
        <AvatarImage
          alt="Delayed Avatar"
          src="https://invalid-url-to-show-fallback.com/image.jpg"
        />
        <AvatarFallback delayMs={600}>NA</AvatarFallback>
      </Avatar>

      {/* Custom styled fallback */}
      <Avatar>
        <AvatarFallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
