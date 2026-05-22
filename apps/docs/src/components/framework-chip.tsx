"use client";

import {Globe, Smartphone} from "@gravity-ui/icons";

import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

export function FrameworkChip({
  className,
  framework = "web",
}: {
  className?: string;
  framework: "web" | "native";
}) {
  const dict = useDictionary().frameworksTabs;
  const isWeb = framework === "web";
  const Icon = isWeb ? Globe : Smartphone;
  const frameworkName = isWeb ? dict.web : dict.native;
  const colorClass = isWeb ? "text-sky-400" : "text-indigo-500";

  return (
    <span className={cn("flex items-center gap-1", className)}>
      <Icon className={cn("size-3", colorClass)} />
      <span className="sr-only">{frameworkName}</span>
    </span>
  );
}
