import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with fallback"
      classNames={{fallbackImg: "bg-center"}}
      fallbackSrc="https://app.requestly.io/delay/3000/https://tse3.mm.bing.net/th/id/OIP.IMYEa-ECkbVQ66EO1LCUDwHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
      height={200}
      src="wrong-image-address"
      width={300}
    />
  );
}
