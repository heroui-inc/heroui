import assert from "node:assert/strict";
import {mkdir, mkdtemp, readFile, rm, writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {rewriteDeclarationImports} from "./rewrite-declaration-imports.mjs";

async function withDeclarations(files, callback) {
  const directoryPath = await mkdtemp(path.join(os.tmpdir(), "heroui-declarations-"));

  try {
    for (const [filePath, content] of Object.entries(files)) {
      const absolutePath = path.join(directoryPath, filePath);

      await mkdir(path.dirname(absolutePath), {recursive: true});
      await writeFile(absolutePath, content);
    }

    await callback(directoryPath);
  } finally {
    await rm(directoryPath, {force: true, recursive: true});
  }
}

test("adds JavaScript extensions to declaration imports without changing package imports", async () => {
  await withDeclarations(
    {
      "components/button-group/index.d.ts": "export interface GroupProps {}\n",
      "components/button/button.d.ts": "export interface ButtonProps {}\n",
      "components/button/existing.d.ts": "export interface ExistingProps {}\n",
      "components/button/index.d.ts": [
        'export type {ButtonProps} from "./button";',
        'export type {GroupProps} from "../button-group";',
        'export type Button = import("./button").ButtonProps;',
        'export type {ComponentProps} from "react";',
        'export type {ExistingProps} from "./existing.js";',
        "",
      ].join("\n"),
    },
    async (directoryPath) => {
      const result = await rewriteDeclarationImports(directoryPath, {log: () => {}});
      const output = await readFile(
        path.join(directoryPath, "components/button/index.d.ts"),
        "utf8",
      );

      assert.deepEqual(result, {files: 4, specifiers: 3});
      assert.match(output, /from "\.\/button\.js"/);
      assert.match(output, /from "\.\.\/button-group\/index\.js"/);
      assert.match(output, /import\("\.\/button\.js"\)/);
      assert.match(output, /from "react"/);
      assert.match(output, /from "\.\/existing\.js"/);
    },
  );
});

test("rejects unresolved extensionless declaration imports", async () => {
  await withDeclarations(
    {"index.d.ts": 'export type {Missing} from "./missing";\n'},
    async (directoryPath) => {
      await assert.rejects(
        rewriteDeclarationImports(directoryPath, {log: () => {}}),
        /Declaration import is not Node ESM compatible/,
      );
    },
  );
});
