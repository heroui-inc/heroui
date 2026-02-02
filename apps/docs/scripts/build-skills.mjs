import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import * as tar from "tar";

import {VALID_SKILLS} from "../src/lib/skills-constants.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const repoRoot = path.join(__dirname, "../..");
const skillsSourceDir = path.join(repoRoot, "..", "skills");
const skillsOutputDir = path.join(__dirname, "../public/skills");

/**
 * Build tar.gz file for a skill
 */
async function buildSkillTarball(skillName) {
  const skillDir = path.join(skillsSourceDir, skillName);
  const outputFile = path.join(skillsOutputDir, `${skillName}.tar.gz`);

  if (!fs.existsSync(skillDir)) {
    throw new Error(`Skill directory not found: ${skillDir}`);
  }

  // Ensure output directory exists
  fs.mkdirSync(skillsOutputDir, {recursive: true});

  // Create tar.gz file
  await tar.create(
    {
      cwd: skillDir,
      file: outputFile,
      gzip: true,
    },
    ["."],
  );

  const stats = fs.statSync(outputFile);

  console.log(`✓ Built ${skillName}.tar.gz (${(stats.size / 1024).toFixed(1)}KB)`);
}

// Build all skills
async function buildAllSkills() {
  console.log("Building skill tarballs...");
  console.log(`Source: ${skillsSourceDir}`);
  console.log(`Output: ${skillsOutputDir}`);
  console.log("");

  if (!fs.existsSync(skillsSourceDir)) {
    throw new Error(`Skills directory not found: ${skillsSourceDir}`);
  }

  for (const skillName of VALID_SKILLS) {
    try {
      await buildSkillTarball(skillName);
    } catch (error) {
      console.error(`✗ Failed to build ${skillName}:`, error.message);
      process.exit(1);
    }
  }

  console.log("");
  console.log("✓ All skill tarballs built successfully");
}

buildAllSkills().catch((error) => {
  console.error("Error building skills:", error);
  process.exit(1);
});
