import {Chip, buttonVariants} from "@heroui/react";
import Link from "fumadocs-core/link";

import {currentVersion} from "@/utils/version";

const VersionChip = () => {
  return (
    <Chip className="bg-default rounded-full">
      <span className="bg-gradient-to-r from-[#CA8501] to-[#BD3232] bg-clip-text text-transparent">
        {currentVersion}
      </span>
    </Chip>
  );
};

export default function HomePage() {
  return (
    <main className="flex h-full flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex h-full flex-col items-center justify-center px-4 py-20 text-center">
        <VersionChip />
        <h1 className="text-foreground mb-6 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Beautiful UI components.
          <br />
          No design experience needed.
        </h1>
        <p className="text-foreground mb-10 max-w-2xl text-balance text-lg">
          The component library that&apos;s easier than copy-paste. Fully customizable and always
          up-to-date, so you can focus on shipping your product.
        </p>

        <div className="mb-8 flex gap-4">
          <Link className={buttonVariants({variant: "primary"})} href="/docs">
            Explore Docs
          </Link>
          <Link className={buttonVariants({variant: "secondary"})} href="/docs">
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}
