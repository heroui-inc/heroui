"use client";

import type {DocsAgentContext} from "./docs-agent-tools";
import type {GetAuthToken} from "@heroui/agent";
import type {Route} from "next";

import {HeroUIAgent} from "@heroui/agent/next";
import {useRouter} from "next/navigation";
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

export function HeroUIDocsAgent({lang}: {lang: string}) {
  const router = useRouter();
  const context = useMemo<DocsAgentContext>(
    () => ({navigate: (url) => router.push(url as Route), page: () => getDocsPageContext(lang)}),
    [lang, router],
  );

  return (
    <HeroUIAgent
      agentId={HEROUI_DOCS_AGENT_ID}
      context={context}
      getAuthToken={getAuthToken}
      locale={lang === "cn" ? "zh-CN" : "en"}
      permissions={{defaultMode: "auto", showPicker: false}}
      tools={docsAgentTools}
    />
  );
}
