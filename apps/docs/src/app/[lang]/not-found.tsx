import LinkRoot from "fumadocs-core/link";
import {HomeLayout} from "fumadocs-ui/layouts/home";
import Image from "next/image";

import {Footer} from "@/components/footer";
import {getDictionary, getRequestLocale} from "@/lib/dictionaries";

import {getHomeLayoutLinks} from "./(home)/home-layout-links";
import {baseOptions} from "./layout.config";

export default async function NotFound() {
  const locale = await getRequestLocale();
  const dict = await getDictionary(locale);
  const {notFound} = dict;

  return (
    <HomeLayout
      {...baseOptions}
      i18n
      links={getHomeLayoutLinks(dict, locale)}
      themeSwitch={{
        mode: "light-dark-system",
      }}
    >
      <div className="mt-12 flex h-full flex-col items-center justify-center text-center md:mt-24">
        <div className="relative h-[275px] w-full max-w-[658px]">
          <Image
            priority
            alt={notFound.imageAlt}
            className="absolute inset-0 block h-full w-full object-cover dark:hidden"
            height={275}
            quality={100}
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/404_@2x.png"
            width={658}
          />
          <Image
            priority
            alt={notFound.imageAlt}
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            height={275}
            quality={100}
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/404-dark_@2x.png"
            width={658}
          />
        </div>
        <h2 className="text-4xl font-bold">{notFound.title}</h2>
        <p className="mt-2 max-w-sm text-balance text-muted">{notFound.description}</p>
        <LinkRoot className="button button--tertiary mt-4" href={`/${locale}`}>
          {notFound.returnHome}
        </LinkRoot>
      </div>
      <Footer dict={dict.footer} />
    </HomeLayout>
  );
}
