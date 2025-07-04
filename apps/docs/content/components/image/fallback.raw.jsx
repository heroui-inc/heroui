import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with fallback"
      classNames={{fallbackImg: "bg-center"}}
      fallbackSrc="https://heroui.com/images/fruit-4.jpeg"
      height={200}
      src="wrong-image-address"
      width={300}
    />
  );
}
