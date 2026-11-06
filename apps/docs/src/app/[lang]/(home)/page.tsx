import {notFound, permanentRedirect} from "next/navigation";

import {hasLocale} from "@/lib/dictionaries";

/**
 * The landing page lives in the heroui.com website, which serves `/` and routes every other path
 * to this app. Here the root (`/`, rewritten to the default locale by the proxy) and the locale
 * roots open the docs.
 */
export default async function HomePage({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  permanentRedirect(`/${lang}/docs/react/getting-started`);
}
