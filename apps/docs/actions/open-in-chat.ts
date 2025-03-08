"use server";

import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {parseDependencies} from "@/components/docs/components/code-demo/parse-dependencies";

const importReact = 'import React from "react";';

export const openInChat = async ({title, files}: {title?: string; files: SandpackFiles}) => {
  try {
    // assumes one file for now
    let content = files["/App.jsx"];

    if (!content || typeof content !== "string") {
      return {
        error: "Content is not a string",
        data: null,
      };
    }

    // Check if the file content includes 'React' import statements, if not, add it
    if (
      content.includes("React.") &&
      !content.includes("from 'react'") &&
      !content.includes('from "react"')
    ) {
      content = `${importReact}\n${content}\n`;
    }

    const dependencies = parseDependencies(content);

    const response = await fetch(`${process.env.CHAT_API_URL}/import`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.IMPORT_API_KEY}`,
      },
      body: JSON.stringify({
        title,
        content,
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

    return {error: null, data: `${process.env.CHAT_URL}${result.path}`};
  } catch (error) {
    return {error: error, data: null};
  }
};
