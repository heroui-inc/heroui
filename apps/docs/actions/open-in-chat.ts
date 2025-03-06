"use server";

import {SandpackFiles} from "@codesandbox/sandpack-react/types";

const importReact = 'import React from "react";';

export const openInChat = async ({
  title,
  files,
  dependencies,
}: {
  title?: string;
  files: SandpackFiles;
  dependencies?: {name: string; version: string}[];
}) => {
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
