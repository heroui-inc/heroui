import fs from "fs";
import path from "path";

import {NextResponse} from "next/server";

import {VALID_SKILLS} from "@/lib/skills-constants.mjs";

export async function GET(_: Request, {params}: {params: Promise<{skill: string}>}) {
  try {
    // Await params (Next.js 15+ requires params to be awaited)
    const {skill} = await params;

    // Extract skill name from parameter (handle .tar.gz suffix)
    let skillName = skill.replace(/\.tar\.gz$/, "");

    // Normalize skill names
    if (skillName === "react") {
      skillName = "heroui-react";
    }

    if (skillName === "native") {
      skillName = "heroui-native";
    }

    // Validate skill name
    if (!VALID_SKILLS.includes(skillName)) {
      return NextResponse.json(
        {
          available: VALID_SKILLS,
          error: `Invalid skill: ${skillName}`,
        },
        {status: 404},
      );
    }

    // Serve pre-built tar.gz file from public directory
    const tarFilePath = path.join(process.cwd(), "public", "skills", `${skillName}.tar.gz`);

    if (!fs.existsSync(tarFilePath)) {
      return NextResponse.json(
        {
          error: `Skill tarball not found: ${skillName}`,
          message:
            "The skill tarball may not have been built. Run 'pnpm dev' or 'pnpm build' to build skill files.",
        },
        {status: 404},
      );
    }

    const tarBuffer = fs.readFileSync(tarFilePath);

    return new NextResponse(tarBuffer, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Disposition": `attachment; filename=${skillName}.tar.gz`,
        "Content-Type": "application/gzip",
      },
    });
  } catch (error) {
    console.error("Error serving skill tarball:", error);

    return NextResponse.json(
      {
        error: "Failed to serve skill tarball",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {status: 500},
    );
  }
}
