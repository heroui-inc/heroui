import type {NextRequest} from "next/server";

import fs from "fs";
import path from "path";

import {NextResponse} from "next/server";

const SKILL_PATHS: Record<string, string> = {
  antigravity: "~/.gemini/antigravity/skills/heroui/",
  claude: "~/.claude/skills/heroui/",
  codex: "~/.codex/skills/heroui/",
  cursor: "~/.cursor/skills/heroui/",
  opencode: "~/.config/opencode/skill/heroui/",
};

export const revalidate = false;

export async function GET(request: NextRequest) {
  const ide = request.nextUrl.searchParams.get("ide") || "claude";
  const skillPath = SKILL_PATHS[ide] || SKILL_PATHS.claude;

  const filePath = path.join(process.cwd(), "_raw", "command.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const body = content.replace(/\{\{SKILL_PATH\}\}/g, skillPath).trim() + "\n";

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
