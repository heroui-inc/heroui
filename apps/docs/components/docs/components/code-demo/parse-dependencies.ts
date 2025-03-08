const packageRegex = /(?:from|import)\s+(?:.*\s+from\s+)?['"]([^'"]+)['"]/g;

export const parseDependencies = (content: string) => {
  const dependencies: {name: string; version: string}[] = [];

  content.match(packageRegex)?.forEach((match) => {
    if (match.includes("@heroui")) {
      return;
    }

    if (match.includes("./") || match.includes("../")) {
      return;
    }

    const packageName = match.match(/['"]([^'"]+)['"]/)?.[1];

    if (!packageName) {
      return;
    }

    dependencies.push({
      name: packageName,
      version: fixedVersions[packageName] || "latest",
    });
  });

  return dependencies;
};

const fixedVersions = {
  "@internationalized/date": "3.7.0",
  "@react-aria/i18n": "3.12.5",
};
