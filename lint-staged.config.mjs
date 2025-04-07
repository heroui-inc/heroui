import {relative} from "path";

import {ESLint} from "eslint";

const removeIgnoredFiles = async (files) => {
  try {
    const cwd = process.cwd();
    const eslint = new ESLint();

    const relativePaths = files.map((file) => relative(cwd, file));
    const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));
    const filteredFiles = files.filter((_, i) => !isIgnored[i]);

    return filteredFiles.join(" ");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    process.exit(1);
  }
};

/** Lint staged config*/
const lintStaged = {
  "**/*.{cjs,mjs,js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    return [`eslint --max-warnings=0 --fix ${filesToLint}`];
  },
  "**/*.{html,css,scss,json,md}": async (files) => {
    return [`prettier --ignore-path --write ${files.join(" ")}`];
  },
};

export default lintStaged;
