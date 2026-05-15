import {Avatar} from "@heroui/react";

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

export function Group() {
  return (
    <div className="flex flex-col gap-6">
      {/* 基础头像组 */}
      <div className="flex -space-x-2">
        {users.slice(0, 4).map((user) => (
          <Avatar key={user.id} className="ring-2 ring-background">
            <Avatar.Image alt={`${user.name} 的头像`} src={user.image} />
            <Avatar.Fallback>{initialsFromName(user.name)}</Avatar.Fallback>
          </Avatar>
        ))}
      </div>

      {/* 带头像数量提示的组合 */}
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="ring-2 ring-background">
            <Avatar.Image alt={`${user.name} 的头像`} src={user.image} />
            <Avatar.Fallback>{initialsFromName(user.name)}</Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-2 ring-background">
          <Avatar.Fallback className="text-xs">+{users.length - 3}</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
}
