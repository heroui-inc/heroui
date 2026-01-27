import {execSync} from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import {NextResponse} from "next/server";

// Valid skill names
const VALID_SKILLS = ["heroui-react", "heroui-native"];

// Skills directory in the repo (at repo root, two levels up from apps/docs)
const SKILLS_DIR = path.join(process.cwd(), "..", "..", "skills");

/**
 * Recursively copy directory from source to destination
 */
function copyDirectory(src: string, dest: string): void {
  fs.mkdirSync(dest, {recursive: true});
  const entries = fs.readdirSync(src, {withFileTypes: true});

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Create tarball from local skill directory
 */
function createSkillTarball(skillName: string) {
  const skillDir = path.join(SKILLS_DIR, skillName);

  if (!fs.existsSync(skillDir)) {
    throw new Error(`Skill not found: ${skillName}`);
  }

  // Create temp directory
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `skill-${skillName}-`));

  try {
    // Copy skill files to temp directory
    copyDirectory(skillDir, tempDir);

    // Create tarball
    const tarBuffer = execSync(`tar czf - -C "${tempDir}" .`, {
      // 10MB max
      encoding: undefined,
      maxBuffer: 10 * 1024 * 1024, // Return Buffer
    });

    // Convert Buffer to Uint8Array for NextResponse
    return tarBuffer;
  } finally {
    // Cleanup temp directory
    fs.rmSync(tempDir, {force: true, recursive: true});
  }
}

export async function GET(_: Request, {params}: {params: Promise<{skill: string}>}) {
  try {
    // Await params (Next.js 15+ requires params to be awaited)
    const {skill} = await params;

    // Extract skill name from parameter (handle .tar.gz suffix)
    let skillName = skill.replace(/\.tar\.gz$/, "");

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

    // Create tarball from local files
    const tarBuffer = createSkillTarball(skillName);

    return new NextResponse(tarBuffer, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Disposition": `attachment; filename=${skillName}.tar.gz`,
        "Content-Type": "application/gzip",
      },
    });
  } catch (error) {
    console.error("Error generating skill tarball:", error);

    return NextResponse.json(
      {
        error: "Failed to generate skill tarball",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {status: 500},
    );
  }
}
