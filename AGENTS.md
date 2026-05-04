# AGENTS.md

## Cursor Cloud specific instructions

### Environment Prerequisites

- **Node.js v22+** is required (installed via binary tarball to `/usr/local/`)
- **pnpm v10.26.2** is the package manager (activated via `corepack`)
- The `packageManager` field in root `package.json` declares `pnpm@10.26.2`

### Key Commands

All standard commands are documented in `CLAUDE.md` and `CONTRIBUTING.md`. Quick reference:

| Action | Command |
|--------|---------|
| Install deps | `pnpm i --hoist` |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Dev (Storybook) | `pnpm dev` (runs on port 6006) |
| Dev (Docs) | `pnpm dev:docs` (runs on port 3000) |
| Test | `pnpm test` |
| Typecheck | `pnpm typecheck` |

### Non-obvious Gotchas

1. **Native build scripts**: The `pnpm.onlyBuiltDependencies` field in root `package.json` allows native addon compilation for `esbuild`, `@swc/core`, `@parcel/watcher`, etc. If this field is missing or packages are added, you'll see "Ignored build scripts" warnings and Storybook/builds may fail.

2. **postinstall runs builds**: `pnpm i` triggers a `postinstall` hook that builds `@heroui/styles` and runs `typegen:docs`. If it fails (e.g., network issue on first install), run `pnpm --filter @heroui/styles build` manually.

3. **No test files currently exist**: `pnpm test` completes with no output because there are no `*.test.*` or `*.spec.*` files yet. The vitest config package exists at `packages/vitest` but no tests are authored yet.

4. **Commit hooks (Husky)**: Pre-commit runs `lint-staged`, commit-msg runs `commitlint`. All commits must follow `type(scope): message` convention (see `CLAUDE.md` for allowed types).

5. **Storybook is the primary dev workflow**: `pnpm dev` starts Storybook at port 6006. This is the recommended way to develop and test components visually.

6. **Build order matters**: Turbo handles `^build` dependencies. `@heroui/styles` must build before `@heroui/react`. Running `pnpm build` from root handles this automatically.
