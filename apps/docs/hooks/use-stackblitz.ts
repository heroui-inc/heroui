import {Project} from "@stackblitz/sdk";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {mapKeys} from "@/../../packages/utilities/shared-utils/src";
import {useSandpack} from "@/components/sandpack/use-sandpack";

export interface UseSandpackProps {
  files: SandpackFiles;
  typescriptStrict?: boolean;
}

function transformSandpackFiles(files: SandpackFiles) {
  return Object.fromEntries(
    Object.entries(files).map(([key, value]) => [
      key,
      typeof value === "string" ? value : value.code,
    ]),
  );
}

export function useStackblitz(props: UseSandpackProps) {
  const {files, typescriptStrict = false} = props;

  const {
    customSetup,
    files: filesData,
    entryFile,
  } = useSandpack({
    files: transformSandpackFiles(files),
    typescriptStrict,
  });

  // in stackblitz, npm will be used to install dependencies
  // it doesn't need `public-hoist-pattern[]=*@heroui/*`
  const filteredFilesData = Object.keys(filesData).reduce((o, k) => {
    o[k] = filesData[k];

    return o;
  }, {});

  const transformFiles = mapKeys(filteredFilesData, (_, key) => key.replace(/^\//, ""));

  const dependencies = {...customSetup.dependencies, ...customSetup.devDependencies};
  const stackblitzPrefillConfig: Project = {
    files: {
      ...transformSandpackFiles(transformFiles),
      "pnpm-workspace.yaml": "packages:\n  - '.'",
    },
    dependencies,
    title: "HeroUI",
    template: "node",
  };

  const findEntryFile = Object.keys(stackblitzPrefillConfig.files).find((key) =>
    key.includes("App"),
  );

  return {
    entryFile: findEntryFile ?? entryFile,
    stackblitzPrefillConfig,
  };
}
