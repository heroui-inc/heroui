import fs from "fs";
import os from "os";
import path from "path";

import {NextResponse} from "next/server";
import * as tar from "tar";

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
async function createSkillTarball(skillName: string): Promise<Buffer> {
  const skillDir = path.join(SKILLS_DIR, skillName);

  if (!fs.existsSync(skillDir)) {
    throw new Error(`Skill not found: ${skillName}`);
  }

  // Create temp directory
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `skill-${skillName}-`));

  try {
    // Copy skill files to temp directory
    copyDirectory(skillDir, tempDir);

    const chunks: Buffer[] = [];
    const tarStream = tar.create(
      {
        cwd: tempDir,
        gzip: true,
      },
      ["."],
    );

    // Collect stream data into buffer
    return new Promise<Buffer>((resolve, reject) => {
      tarStream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
        // Safety check: 10MB max
        const totalSize = chunks.reduce((sum, c) => sum + c.length, 0);

        if (totalSize > 10 * 1024 * 1024) {
          tarStream.destroy();
          reject(new Error("Tarball exceeds 10MB limit"));
        }
      });

      tarStream.on("end", () => {
        // Cleanup temp directory after stream completes
        try {
          fs.rmSync(tempDir, {force: true, recursive: true});
        } catch (cleanupError) {
          console.error("Failed to cleanup temp directory:", cleanupError);
        }
        resolve(Buffer.concat(chunks));
      });

      tarStream.on("error", (error: unknown) => {
        // Cleanup temp directory on error
        try {
          fs.rmSync(tempDir, {force: true, recursive: true});
        } catch (cleanupError) {
          console.error("Failed to cleanup temp directory on error:", cleanupError);
        }
        reject(error instanceof Error ? error : new Error(String(error)));
      });
    });
  } catch (error) {
    // Cleanup temp directory on exception (before Promise creation)
    try {
      fs.rmSync(tempDir, {force: true, recursive: true});
    } catch (cleanupError) {
      console.error("Failed to cleanup temp directory on exception:", cleanupError);
    }
    throw error;
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
    const tarBuffer = await createSkillTarball(skillName);

    return new NextResponse(tarBuffer as unknown as BodyInit, {
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
