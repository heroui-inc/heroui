import {Avatar, AvatarGroup} from "@heroui/react";

const users = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "张明",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "李华",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "王芳",
  },
  {
    id: 4,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "刘洋",
  },
  {
    id: 5,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "陈静",
  },
];

function initialsFromName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return parts.map((n) => n[0]).join("");
  }

  return name.slice(0, 2);
}

export function Sizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">小号</p>
        <AvatarGroup size="sm">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={`${user.name} 的头像`} src={user.image} />
              <Avatar.Fallback>{initialsFromName(user.name)}</Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">中号（默认）</p>
        <AvatarGroup size="md">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={`${user.name} 的头像`} src={user.image} />
              <Avatar.Fallback>{initialsFromName(user.name)}</Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted">大号</p>
        <AvatarGroup size="lg">
          {users.slice(0, 4).map((user) => (
            <Avatar key={user.id}>
              <Avatar.Image alt={`${user.name} 的头像`} src={user.image} />
              <Avatar.Fallback>{initialsFromName(user.name)}</Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}
