import {Avatar} from "@heroui/react";
import Image from "next/image";

const SRC = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg";

export function CustomImageComponent() {
  return (
    <Avatar>
      <Avatar.Image asChild height={40} src={SRC} width={40}>
        <Image alt="John Doe" src={SRC} />
      </Avatar.Image>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}
