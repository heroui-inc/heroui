"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@heroui/react";

export function WithAvatar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="w-[200px] gap-2">
        <img
          alt="Indie Hackers community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/device.png"
        />
        <CardHeader>
          <CardTitle>Indie Hackers</CardTitle>
          <CardDescription>148 members</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Avatar aria-label="Martha's profile picture" className="size-5" role="img">
            <AvatarImage
              alt="Martha's avatar"
              src="https://img.heroui.chat/image/avatar?w=160&h=160"
            />
            <AvatarFallback className="text-xs">IH</AvatarFallback>
          </Avatar>
          <span className="text-xs">By Martha</span>
        </CardFooter>
      </Card>

      <Card className="w-[200px] gap-2">
        <img
          alt="AI Builders community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/ai-bot.png"
        />
        <CardHeader>
          <CardTitle>AI Builders</CardTitle>
          <CardDescription>362 members</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Avatar aria-label="John's profile picture" className="size-5" role="img">
            <AvatarImage
              alt="John's avatar - blue themed"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <AvatarFallback className="text-xs">B</AvatarFallback>
          </Avatar>
          <span className="text-xs">By John</span>
        </CardFooter>
      </Card>
    </div>
  );
}
