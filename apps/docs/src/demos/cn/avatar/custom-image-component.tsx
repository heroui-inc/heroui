import {Avatar} from "@heroui/react";
import Image from "next/image";

const SRC = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg";

export function CustomImageComponent() {
  return (
    <Avatar>
      <Avatar.Image asChild height={40} src={SRC} width={40}>
        <Image alt="约翰·多伊" src={SRC} />
      </Avatar.Image>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}
