"use client";

import React from "react";

import {Avatar} from "@heroui/react";

export function AvatarBasic() {
  return (
    <Avatar>
      <Avatar.Image
        src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
        alt="User avatar"
      />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
          alt="Small avatar"
        />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>

      <Avatar size="md">
        <Avatar.Image
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
          alt="Medium avatar"
        />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>

      <Avatar size="lg">
        <Avatar.Image
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
          alt="Large avatar"
        />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    </div>
  );
}

export function AvatarShapes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <Avatar.Image
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=6"
          alt="Circle avatar"
        />
        <Avatar.Fallback>CR</Avatar.Fallback>
      </Avatar>

      <Avatar className="rounded-lg">
        <Avatar.Image
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=7"
          alt="Square avatar"
        />
        <Avatar.Fallback>SQ</Avatar.Fallback>
      </Avatar>
    </div>
  );
}

export function AvatarFallback() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <Avatar.Image
          src="/invalid-image.jpg"
          alt="User avatar"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>

      <Avatar>
        <Avatar.Fallback className="bg-purple-500 text-white">
          CD
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
}

export function AvatarGroup() {
  const users = [
    { name: "John Doe", src: "https://img.heroui.chat/image/avatar?w=400&h=400&u=3" },
    { name: "Jane Smith", src: "https://img.heroui.chat/image/avatar?w=400&h=400&u=4" },
    { name: "Bob Johnson", src: "https://img.heroui.chat/image/avatar?w=400&h=400&u=5" },
    { name: "Alice Brown", src: "https://img.heroui.chat/image/avatar?w=400&h=400&u=6" },
  ];

  return (
    <div className="flex -space-x-2">
      {users.map((user) => (
        <Avatar
          key={user.name}
          className="ring-2 ring-background"
        >
          <Avatar.Image src={user.src} alt={user.name} />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      ))}
      <Avatar className="ring-2 ring-background">
        <Avatar.Fallback className="border-none">+5</Avatar.Fallback>
      </Avatar>
    </div>
  );
}