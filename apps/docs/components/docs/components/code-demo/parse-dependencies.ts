import React from "react";
import * as HeroUI from "@heroui/react";

const importRegex = /^(import\s+(?!type\s+\{)[\s\S]*?;)/gm;

export const parseDependencies = (content: string) => {
  const dependencies: {name: string; version: string}[] = [];

  // by default, react and heroui packages are installed already
  const installedPackages = {
    React,
    ...HeroUI,
  } as Record<string, unknown>;

  // create a map of installed packages
  const imports = Object.keys(installedPackages).reduce(
    (acc, key) => {
      acc[key] = `${key}`;

      return acc;
    },
    {React: "React"} as Record<string, string>,
  );

  // match all imports from the file content
  content.match(importRegex)?.forEach((match) => {
    // check if imported component is in default installed packages
    const componentName = match.match(/\w+/g)?.[1] || "";
    const matchingImport = imports[componentName];

    if (matchingImport) {
      return "";
    }

    if (match.includes("./") || match.includes("../")) {
      return "";
    }

    const packageName = match.match(/['"]([^'"]+)['"]/)?.[1];

    if (!packageName) {
      return;
    }

    dependencies.push({
      name: packageName,
      version: fixedVersions[packageName] || "latest",
    });
  });

  return dependencies;
};

const fixedVersions = {
  "@internationalized/date": "3.7.0",
  "@react-aria/i18n": "3.12.5",
};
