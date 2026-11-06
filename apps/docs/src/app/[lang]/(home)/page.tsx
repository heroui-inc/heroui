import {notFound, redirect} from "next/navigation";

import {hasLocale} from "@/lib/dictionaries";

/**
 * The landing page lives in the heroui.com website, which serves `/` and routes every other path
 * to this app. Here the root (`/`, rewritten to the default locale by the proxy) and the locale
 * roots open the docs. The redirect is temporary: on heroui.com `/` belongs to the website, and a
 * cached permanent one would keep visitors from it.
 */
export default async function HomePage({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  redirect(`/${lang}/docs/react/getting-started`);
}
