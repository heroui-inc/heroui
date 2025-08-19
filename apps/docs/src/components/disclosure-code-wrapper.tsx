"use client";

import {Disclosure, buttonVariants} from "@heroui/react";
import * as React from "react";

import {cn} from "@/utils/cn";

export function CodeDisclosureWrapper({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Disclosure
      className={cn("group/disclosure relative min-h-64 md:-mx-1", className)}
      isExpanded={isOpened}
      onExpandedChange={setIsOpened}
      {...props}
    >
      <Disclosure.Trigger className="absolute bottom-4 right-1/2 z-10 flex translate-x-1/2 items-center p-0">
        <button className={buttonVariants({size: "sm", variant: "secondary"})}>
          {isOpened ? "Collapse" : "Expand"}
        </button>
      </Disclosure.Trigger>
      <Disclosure.Content className="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0">
        {children}
      </Disclosure.Content>
    </Disclosure>
  );
}
