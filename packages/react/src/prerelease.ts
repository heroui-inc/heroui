import {Logger} from "./utils/logger";
import {HEROUI_VERSION} from "./version";

const logger = new Logger({
  enabled: true,
  prefix: "HeroUI",
});

/**
 * Get the package version
 */
function getPackageVersion(): {
  version: string;
  isPrerelease: boolean;
  prereleaseType?: string;
} {
  const version = HEROUI_VERSION;

  // Check if it's a prerelease version (alpha, beta, rc, etc.)
  const isPrerelease = version.includes("-");
  let prereleaseType: string | undefined;

  if (isPrerelease) {
    if (version.includes("-alpha")) prereleaseType = "alpha";
    else if (version.includes("-beta")) prereleaseType = "beta";
    else if (version.includes("-rc")) prereleaseType = "release candidate";
    else prereleaseType = "prerelease";
  }

  return {isPrerelease, prereleaseType, version};
}

/**
 * Show prerelease warning if applicable
 */
export function handlePrereleaseWarning(): void {
  const {isPrerelease, prereleaseType, version} = getPackageVersion();

  if (isPrerelease) {
    logger.newline();
    logger.divider("=", 80);
    logger.warn("IMPORTANT!");
    logger.warn(`You are using a ${prereleaseType} version [@heroui/react@v${version}]`);
    logger.warn("This version may contain bugs and breaking changes.");
    logger.warn("Use in production at your own risk!");
    logger.divider("=", 80);
    logger.newline();
  }

  logger.newline();
}
