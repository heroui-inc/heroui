"use server";

import {toKebabCase, toPascalCase} from "@/components/docs/components/code-demo/utils";

const importReact = 'import React from "react";';

export const openInChat = async ({
  component,
  title,
  content,
  dependencies,
  useWrapper,
}: {
  component: string;
  title?: string;
  content: string;
  dependencies: {name: string; version: string}[];
  useWrapper: boolean;
}) => {
  try {
    // Check if the file content includes 'React' import statements, if not, add it
    if (
      content.includes("React.") &&
      !content.includes("from 'react'") &&
      !content.includes('from "react"')
    ) {
      content = `${importReact}\n${content}\n`;
    }

    let files: Record<string, string> = {
      "src/App.tsx": content,
    };

    const fullName = `${component.charAt(0).toUpperCase() + component.slice(1)} - ${title}`;

    if (useWrapper) {
      files = getFilesWithWrapper(fullName, content);
    }

    const response = await fetch(`${process.env.CHAT_API_URL}/import`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.IMPORT_API_KEY}`,
      },
      body: JSON.stringify({
        title: `${component.charAt(0).toUpperCase() + component.slice(1)} - ${title}`,
        files,
        dependencies,
      }),
    });

    const result = await response.json();

    if (result.error || !result.path) {
      return {
        error: result.error ?? "Unknown error",
        data: null,
      };
    }

    return {
      error: null,
      data: `${process.env.CHAT_URL}${
        result.path
      }&utm_source=heroui.com&utm_medium=open-in-chat&utm_content=${encodeURIComponent(
        title ?? "unknown",
      )}`,
    };
  } catch (error) {
    return {error: error, data: null};
  }
};

const getFilesWithWrapper = (name: string, content: string) => {
  const pascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);

  // Replace the export default function name
  const updatedContent = content.replace(
    "export default function App()",
    `export default function ${pascalName}()`,
  );

  const wrapperContent = `import ${pascalName} from "./components/${kebabName}";

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <${pascalName} />
    </div>
  );
}
`;

  return {
    [`src/components/${kebabName}.tsx`]: updatedContent,
    [`src/App.tsx`]: wrapperContent,
  };
};
