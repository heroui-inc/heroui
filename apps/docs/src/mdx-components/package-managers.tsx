"use client";

import {CodeBlock, Pre} from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";

import {BunIcon, CLIBoldIcon, NpmSmallIcon, PnpmIcon, YarnIcon} from "@/icons/dev";

const {Tabs, TabsContent, TabsList, TabsTrigger} = TabsComponents;

type PackageManagerName = "cli" | "npm" | "yarn" | "pnpm" | "bun";

type PackageManager = {
  icon: React.ReactNode;
  name: PackageManagerName;
  label?: string;
};

const packageManagers: PackageManager[] = [
  {
    icon: <CLIBoldIcon className="text-default-600 dark:text-default-400 text-lg" />,
    label: "CLI",
    name: "cli",
  },
  {
    icon: <PnpmIcon className="text-[#F69220]" />,
    name: "pnpm",
  },
  {
    icon: <NpmSmallIcon className="text-[#E53E3E]" />,
    name: "npm",
  },
  {
    icon: <YarnIcon className="text-[#2C8EBB]" />,
    name: "yarn",
  },
  {
    icon: <BunIcon className="text-lg text-[#FBF0DF]" />,
    name: "bun",
  },
];

export interface PackageManagersProps {
  commands: Partial<Record<PackageManagerName, React.Key>>;
}

export const PackageManagers = ({commands}: PackageManagersProps) => {
  // Get the first available command as default
  const availableManagers = packageManagers.filter((pm) => commands[pm.name]);
  const defaultValue = availableManagers[0]?.name || "npm";

  return (
    <>
      <Tabs
        className="mt-4 w-full min-w-[300px] border-none bg-transparent"
        defaultValue={defaultValue}
      >
        <TabsList className="mb-1 h-10 overflow-x-auto">
          {packageManagers.map(({icon, label, name}) => {
            if (!commands[name]) return null;

            return (
              <TabsTrigger key={name} className="flex items-center gap-2" value={name}>
                {icon}
                <span>{label || name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {packageManagers.map(({name}) => {
          if (!commands[name]) return null;

          return (
            <TabsContent key={name} value={name}>
              <CodeBlock lang="bash">
                <Pre className="px-3">{commands[name]}</Pre>
              </CodeBlock>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
};
