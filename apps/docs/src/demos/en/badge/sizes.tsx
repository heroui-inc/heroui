import {Avatar, Badge} from "@heroui/react";

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

export function BadgeSizes() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex items-center gap-6">
      {sizes.map((size) => (
        <Badge.Anchor key={size}>
          <Avatar size={size}>
            <Avatar.Image src={AVATAR_URL} />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Badge color="danger" size={size}>
            5
          </Badge>
        </Badge.Anchor>
      ))}
    </div>
  );
}
