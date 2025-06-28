import {Image} from "@heroui/react";

export default function App() {
  return (
    <Image
      alt="HeroUI Image with custom loading"
      classNames={{loadingImg: ["bg-center", "bg-cover"]}}
      height={200}
      loadingSrc="https://tse4.mm.bing.net/th/id/OIP.12UpAuSiygkASTHDo8hrpQHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
      src="https://app.requestly.io/delay/2000/https://heroui.com/images/hero-card-complete.jpeg"
      width={300}
    />
  );
}
