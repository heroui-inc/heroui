import {HomeLayout} from "fumadocs-ui/layouts/home";
import Image from "next/image";
import Link from "next/link";

import {baseOptions, homeLayoutLinks} from "@/app/layout.config";
import {Footer} from "@/components/footer";

export default function NotFound() {
  return (
    <HomeLayout
      {...baseOptions}
      links={homeLayoutLinks}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      <div className="mt-12 flex h-full flex-col items-center justify-center text-center md:mt-24">
        <div className="relative h-[275px] w-full max-w-[658px]">
          <Image
            priority
            alt="404 Not Found"
            className="absolute inset-0 block h-full w-full object-cover dark:hidden"
            height={275}
            quality={100}
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/404_@2x.png"
            width={658}
          />
          <Image
            priority
            alt="404 Not Found"
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            height={275}
            quality={100}
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/404-dark_@2x.png"
            width={658}
          />
        </div>
        <h2 className="text-4xl font-bold">404</h2>
        <p className="mt-2 max-w-sm text-balance text-muted">
          Sorry, the page you're looking for could not be found.
        </p>
        <Link className="button button--tertiary mt-4" href="/">
          Return Home
        </Link>
      </div>
      <Footer />
    </HomeLayout>
  );
}
