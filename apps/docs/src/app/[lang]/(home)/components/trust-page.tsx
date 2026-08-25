import type {ReactNode} from "react";

import {Footer} from "@/components/footer";
import {getDictionary} from "@/lib/dictionaries";

export async function TrustPage({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  const dict = await getDictionary("en");

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-24">
        <header className="mb-10 border-b border-border pb-8">
          <p className="mb-3 text-sm font-medium text-muted">HeroUI</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
        </header>
        <div className="space-y-8 text-base leading-7 text-muted [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:mt-3">
          {children}
        </div>
      </article>
      <Footer dict={dict.footer} />
    </main>
  );
}
