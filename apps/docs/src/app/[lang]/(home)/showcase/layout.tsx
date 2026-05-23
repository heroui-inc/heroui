import type {ReactNode} from "react";

import {notFound} from "next/navigation";

import {getDictionary, hasLocale} from "@/lib/dictionaries";

export default async function ShowcaseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const {showcase} = dict;

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-[68rem]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{showcase.heading}</h1>
        <p className="mb-12 text-lg font-light text-muted">{showcase.description}</p>
        {children}
      </div>
    </main>
  );
}
