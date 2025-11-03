"use client";

import {Avatar} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Fallback() {
  return (
    <div className="flex items-center gap-4">
      {/* Text fallback */}
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      {/* Icon fallback */}
      <Avatar>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person" />
        </Avatar.Fallback>
      </Avatar>

      {/* Fallback with delay */}
      <Avatar>
        <Avatar.Image
          alt="Delayed Avatar"
          src="https://invalid-url-to-show-fallback.com/image.jpg"
        />
        <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
      </Avatar>

      {/* Custom styled fallback */}
      <Avatar>
        <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
}
