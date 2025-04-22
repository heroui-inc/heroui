import fs from "fs/promises";
import path from "path";

import {glob} from "glob";

async function collectCoverageFiles() {
  try {
    const patterns = ["../../apps/*", "../../packages/*"];

    const destinationDir = path.join(process.cwd(), "coverage/raw");

    await fs.mkdir(destinationDir, {recursive: true});

    const allDirectories = [];
    const directoriesWithCoverage = [];

    for (const pattern of patterns) {
      const matches = await glob(pattern);

      for (const match of matches) {
        const stats = await fs.stat(match);

        if (stats.isDirectory()) {
          allDirectories.push(match);
          const coverageFilePath = path.join(match, "coverage.json");

          try {
            await fs.access(coverageFilePath);

            directoriesWithCoverage.push(match);

            const directoryName = path.basename(match);
            const destinationFile = path.join(destinationDir, `${directoryName}.json`);

            await fs.copyFile(coverageFilePath, destinationFile);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`File doesn't exist in this directory, skip: ${coverageFilePath}`);
          }
        }
      }
    }

    const replaceDotPatterns = (str: string) => str.replace(/\.\.\//g, "");

    if (directoriesWithCoverage.length > 0) {
      // eslint-disable-next-line no-console
      console.log(
        `Found coverage.json in: ${directoriesWithCoverage.map(replaceDotPatterns).join(", ")}`,
      );
    }

    // eslint-disable-next-line no-console
    console.log(`Coverage collected into: ${path.join(process.cwd())}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error collecting coverage files:", error);
  }
}

collectCoverageFiles();
