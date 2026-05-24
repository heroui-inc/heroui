import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

import {
  AGENT_SKILL_DESCRIPTIONS,
  absoluteUrl,
  getRequestOrigin,
  jsonResponse,
} from "@/lib/agent-discovery";
import {VALID_SKILLS} from "@/lib/skills-constants.mjs";

export const dynamic = "force-dynamic";
export const revalidate = false;

async function getSkillDigest(skillName: string): Promise<string> {
  const skillPath = join(process.cwd(), "public", "skills", `${skillName}.tar.gz`);
  const archive = await readFile(skillPath);
  const digest = createHash("sha256").update(archive).digest("hex");

  return `sha256:${digest}`;
}

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);

  try {
    const skills = await Promise.all(
      VALID_SKILLS.map(async (skillName) => ({
        description:
          AGENT_SKILL_DESCRIPTIONS[skillName] ?? `HeroUI skill archive for ${skillName}.`,
        digest: await getSkillDigest(skillName),
        name: skillName,
        type: "archive",
        url: absoluteUrl(origin, `/skills/${skillName}.tar.gz`),
      })),
    );

    return jsonResponse({
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills,
    });
  } catch (error) {
    return jsonResponse(
      {
        error: "Failed to build agent skills index",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {status: 500},
    );
  }
}
