/* eslint-disable no-console */
"use client";

import {Icon} from "@iconify/react";
import React from "react";

interface PageActionsProps {
  sourceUrl: string;
  markdownContent?: string;
}

export function PageActions({markdownContent, sourceUrl}: PageActionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyToClipboard = async () => {
    try {
      const baseUrl = window.location.origin;
      const currentPath = window.location.pathname;
      const fullUrl = `${baseUrl}${currentPath}`;

      // Create markdown content with link
      const content =
        markdownContent ||
        `# HeroUI Documentation\n\nView the full documentation at: ${fullUrl}\n\nSource: ${sourceUrl}`;

      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleOpenInChatGPT = () => {
    const currentUrl = window.location.href;
    const chatGPTUrl = `https://chat.openai.com/?q=${encodeURIComponent(
      `Help me understand this HeroUI documentation page: ${currentUrl}`,
    )}`;

    window.open(chatGPTUrl, "_blank");
  };

  const handleOpenInClaude = () => {
    const currentUrl = window.location.href;
    const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(
      `Help me understand this HeroUI documentation page: ${currentUrl}`,
    )}`;

    window.open(claudeUrl, "_blank");
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 border-b pb-4">
      <button
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
        title="Copy page link for AI chat"
        onClick={handleCopyToClipboard}
      >
        <Icon className="h-3.5 w-3.5" icon={copied ? "gravity-ui:check" : "gravity-ui:copy"} />
        {copied ? "Copied!" : "Copy for AI"}
      </button>

      <button
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
        title="Open in ChatGPT"
        onClick={handleOpenInChatGPT}
      >
        <Icon className="h-3.5 w-3.5" icon="simple-icons:openai" />
        ChatGPT
      </button>

      <button
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
        title="Open in Claude"
        onClick={handleOpenInClaude}
      >
        <Icon className="h-3.5 w-3.5" icon="simple-icons:anthropic" />
        Claude
      </button>

      <a
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
        href={sourceUrl}
        rel="noopener noreferrer"
        target="_blank"
        title="View source on GitHub"
      >
        <Icon className="h-3.5 w-3.5" icon="mdi:github" />
        Source
      </a>
    </div>
  );
}
