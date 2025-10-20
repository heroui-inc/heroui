"use client";

import {AvatarFallback, AvatarImage, AvatarRoot} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Fallback() {
  return (
    <div className="flex items-center gap-4">
      {/* Text fallback */}
      <AvatarRoot>
        <AvatarFallback>JD</AvatarFallback>
      </AvatarRoot>

      {/* Icon fallback */}
      <AvatarRoot>
        <AvatarFallback>
          <Icon icon="gravity-ui:person" />
        </AvatarFallback>
      </AvatarRoot>

      {/* Fallback with delay */}
      <AvatarRoot>
        <AvatarImage
          alt="Delayed Avatar"
          src="https://invalid-url-to-show-fallback.com/image.jpg"
        />
        <AvatarFallback delayMs={600}>NA</AvatarFallback>
      </AvatarRoot>

      {/* Custom styled fallback */}
      <AvatarRoot>
        <AvatarFallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
