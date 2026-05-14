import Image from "next/image";

import {siteConfig} from "@/config/site";

export function ThemeBackground() {
  const lightBg = `${siteConfig.cdnUrl}/backgrounds/docs-light-bg.jpg`;
  const darkBg = `${siteConfig.cdnUrl}/backgrounds/docs-dark-bg.jpg`;

  return (
    <>
      {/* Light theme background */}
      <Image
        fill
        priority
        alt=""
        className="fixed inset-0 z-0 object-cover object-center dark:hidden"
        quality={100}
        src={lightBg}
      />
      {/* Dark theme background */}
      <Image
        fill
        priority
        alt=""
        className="fixed inset-0 z-0 hidden object-cover object-center dark:block"
        quality={100}
        src={darkBg}
      />
    </>
  );
}
