import type {NextRequest} from "next/server";

import fs from "fs";
import path from "path";

import {NextResponse} from "next/server";

const SKILL_PATHS: Record<string, Record<string, string>> = {
  antigravity: {
    "heroui-native": "~/.gemini/antigravity/skills/heroui-native/",
    "heroui-react": "~/.gemini/antigravity/skills/heroui-react/",
  },
  claude: {
    "heroui-native": "~/.claude/skills/heroui-native/",
    "heroui-react": "~/.claude/skills/heroui-react/",
  },
  codex: {
    "heroui-native": "~/.codex/skills/heroui-native/",
    "heroui-react": "~/.codex/skills/heroui-react/",
  },
  cursor: {
    "heroui-native": "~/.cursor/skills/heroui-native/",
    "heroui-react": "~/.cursor/skills/heroui-react/",
  },
  opencode: {
    "heroui-native": "~/.config/opencode/skill/heroui-native/",
    "heroui-react": "~/.config/opencode/skill/heroui-react/",
  },
};

export const revalidate = false;

export async function GET(request: NextRequest) {
  const ide = request.nextUrl.searchParams.get("ide") || "claude";
  const skill = request.nextUrl.searchParams.get("skill") || "heroui-react";

  // Determine which command file to serve
  const commandFile = skill === "heroui-native" ? "command-native.md" : "command.md";
  const filePath = path.join(process.cwd(), "_raw", commandFile);

  // Get skill path for the IDE and skill combination
  const idePaths = SKILL_PATHS[ide] || SKILL_PATHS["claude"];
  const skillPath =
    idePaths?.[skill] || idePaths?.["heroui-react"] || "~/.claude/skills/heroui-react/";

  const content = fs.readFileSync(filePath, "utf-8");
  const body = content.replace(/\{\{SKILL_PATH\}\}/g, skillPath).trim() + "\n";

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
