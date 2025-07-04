import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with custom loading"
      classNames={{loadingImg: ["bg-center", "bg-cover"]}}
      height={200}
      loadingSrc="placeholder_300x450.png"
      src="https://app.requestly.io/delay/2000/https://heroui.com/images/hero-card-complete.jpeg"
      width={300}
    />
  );
}
