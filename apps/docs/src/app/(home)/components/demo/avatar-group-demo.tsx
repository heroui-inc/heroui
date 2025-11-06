import {Avatar} from "@heroui/react";
import Image from "next/image";

const avatars = [
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Blue",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Green",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Purple",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Orange",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "red",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Blue",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    name: "Black",
  },
];

export function AvatarGroupDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex -space-x-2">
        {avatars.slice(0, 5).map((item, index) => (
          <Avatar key={`${item.name}-${index}`} className="ring-background ring-2">
            <Avatar.Image asChild alt={item.name}>
              <Image alt={item.name} height={40} src={item.image} width={40} />
            </Avatar.Image>
            <Avatar.Fallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <Avatar.Fallback className="bg-surface text-muted text-xs font-medium">
            +{avatars.length - 2}
          </Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
}
