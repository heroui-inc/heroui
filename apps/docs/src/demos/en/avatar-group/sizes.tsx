import {Avatar, AvatarGroup} from "@heroui/react";

const users = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Emily Chen",
  },
  {
    id: 4,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Michael Brown",
  },
  {
    id: 5,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "Olivia Davis",
  },
];

export function Sizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">Small</p>
        <AvatarGroup size="sm">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">Medium (default)</p>
        <AvatarGroup size="md">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">Large</p>
        <AvatarGroup size="lg">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}
