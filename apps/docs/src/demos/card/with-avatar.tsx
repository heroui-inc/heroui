"use client";

import {Avatar, Card} from "@heroui/react";

export function WithAvatar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card.Root className="w-[200px] gap-2">
        <img
          alt="Indie Hackers community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/device.png"
        />
        <Card.Header>
          <Card.Title>Indie Hackers</Card.Title>
          <Card.Description>148 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar.Root aria-label="Martha's profile picture" className="size-5" role="img">
            <Avatar.Image
              alt="Martha's avatar"
              src="https://img.heroui.chat/image/avatar?w=160&h=160"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar.Root>
          <span className="text-xs">By Martha</span>
        </Card.Footer>
      </Card.Root>

      <Card.Root className="w-[200px] gap-2">
        <img
          alt="AI Builders community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/ai-bot.png"
        />
        <Card.Header>
          <Card.Title>AI Builders</Card.Title>
          <Card.Description>362 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar.Root aria-label="John's profile picture" className="size-5" role="img">
            <Avatar.Image
              alt="John's avatar - blue themed"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
          </Avatar.Root>
          <span className="text-xs">By John</span>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
