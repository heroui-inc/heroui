"use client";

import type {DocsAgentContext, ThemeMode} from "./docs-agent-tools";
import type {GetAuthToken} from "@heroui/agent";
import type {Route} from "next";

import {HeroUIAgent} from "@heroui/agent/next";
import {useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {useMemo} from "react";

import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";

import {docsAgentTools, getDocsPageContext} from "./docs-agent-tools";

const getAuthToken: GetAuthToken = async (context) => {
  const response = await fetch("/api/heroui-agent/auth-token", {
    body: JSON.stringify(context),
    headers: {"Content-Type": "application/json"},
    method: "POST",
    signal: context.signal,
  });

  if (!response.ok) throw new Error("Agent authentication failed");

  return response.json();
};

export function HeroUIDocsAgent() {
  const router = useRouter();
  const {setTheme, theme} = useTheme();
  const colorScheme: ThemeMode = theme === "dark" || theme === "light" ? theme : "system";
  const context = useMemo<DocsAgentContext>(
    () => ({
      navigate: (url) => router.push(url as Route),
      page: getDocsPageContext,
      theme: {
        getMode: () => colorScheme,
        setMode: setTheme,
      },
    }),
    [colorScheme, router, setTheme],
  );

  return (
    <HeroUIAgent
      showLauncher
      startNewConversationOnOpen
      agentId={HEROUI_DOCS_AGENT_ID}
      appearance={{theme: {colorScheme}, viewMode: "sidebar"}}
      context={context}
      getAuthToken={getAuthToken}
      locale="en"
      permissions={{defaultMode: "auto", showPicker: false}}
      tools={docsAgentTools}
    />
  );
}
