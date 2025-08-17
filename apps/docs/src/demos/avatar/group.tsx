"use client";

import {Avatar} from "@heroui/react";

const users = [
  {
    id: 1,
    image: "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://img.heroui.chat/image/avatar?w=400&h=400&u=20",
    name: "Emily Chen",
  },
  {
    id: 4,
    image: "https://img.heroui.chat/image/avatar?w=400&h=400&u=23",
    name: "Michael Brown",
  },
  {
    id: 5,
    image: "https://img.heroui.chat/image/avatar?w=400&h=400&u=16",
    name: "Olivia Davis",
  },
];

export function Group() {
  return (
    <div className="flex flex-col gap-6">
      {/* Basic avatar group */}
      <div className="flex -space-x-2">
        {users.slice(0, 4).map((user) => (
          <Avatar key={user.id} className="ring-background ring-2">
            <Avatar.Image alt={user.name} src={user.image} />
            <Avatar.Fallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
      </div>

      {/* Avatar group with counter */}
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="ring-background ring-2">
            <Avatar.Image alt={user.name} src={user.image} />
            <Avatar.Fallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <Avatar.Fallback className="text-xs">+{users.length - 3}</Avatar.Fallback>
        </Avatar>
      </div>

      {/* Different size avatar group */}
      <div className="flex -space-x-3">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="ring-background ring-2" size="lg">
            <Avatar.Image alt={user.name} src={user.image} />
            <Avatar.Fallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}
