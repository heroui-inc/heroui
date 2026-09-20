"use client";

import {useEffect} from "react";

import {docsToolDefinitions} from "./docs-agent-tools";

type WebMCPTool = {
  description: string;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
  inputSchema: Record<string, unknown>;
  name: string;
};

type WebMCPModelContext = {
  provideContext?: (
    context: {tools: WebMCPTool[]},
    options?: {signal?: AbortSignal},
  ) => (() => void) | void;
  provideTools?: (tools: WebMCPTool[], options?: {signal?: AbortSignal}) => (() => void) | void;
  registerTool?: (tool: WebMCPTool) => void;
  unregisterTool?: (name: string) => void;
};

declare global {
  interface Navigator {
    modelContext?: WebMCPModelContext;
  }
}

const tools: WebMCPTool[] = docsToolDefinitions.map(({description, execute, name, parameters}) => ({
  description,
  execute: (input) => execute(input),
  inputSchema: parameters as Record<string, unknown>,
  name,
}));

const WEBMCP_REGISTRATION_RETRY_MS = 100;
const WEBMCP_REGISTRATION_TIMEOUT_MS = 5000;

export function WebMCPProvider() {
  useEffect(() => {
    const abortController = new AbortController();
    const registeredTools: string[] = [];
    let cleanup: (() => void) | void;
    let didRegister = false;
    let didWarn = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const registerTools = (modelContext: WebMCPModelContext | undefined): boolean => {
      if (!modelContext || didRegister) return didRegister;

      try {
        if (typeof modelContext.provideContext === "function") {
          cleanup = modelContext.provideContext({tools}, {signal: abortController.signal});
          didRegister = true;

          return true;
        }

        if (typeof modelContext.provideTools === "function") {
          cleanup = modelContext.provideTools(tools, {signal: abortController.signal});
          didRegister = true;

          return true;
        }

        if (typeof modelContext.registerTool === "function") {
          for (const tool of tools) {
            modelContext.registerTool(tool);
            registeredTools.push(tool.name);
          }

          didRegister = true;

          return true;
        }
      } catch (error) {
        if (!didWarn) {
          console.warn("Unable to register HeroUI WebMCP tools", error);
          didWarn = true;
        }
      }

      return false;
    };

    if (!registerTools(navigator.modelContext)) {
      intervalId = setInterval(() => {
        if (registerTools(navigator.modelContext) && intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }, WEBMCP_REGISTRATION_RETRY_MS);

      timeoutId = setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }, WEBMCP_REGISTRATION_TIMEOUT_MS);
    }

    return () => {
      abortController.abort();

      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      if (typeof cleanup === "function") cleanup();

      const modelContext = navigator.modelContext;

      if (typeof modelContext?.unregisterTool === "function") {
        for (const toolName of registeredTools) {
          modelContext.unregisterTool(toolName);
        }
      }
    };
  }, []);

  return null;
}
