import type {DemoItem} from "@/demos";

/**
 * Chinese (zh) demo registry.
 *
 * Keys must match the keys in `../en/index.ts`. Any demo not registered here
 * will automatically fall back to the English version via `getDemo()` in the
 * parent module, so this file can grow incrementally as translations land.
 *
 * Each `file` path is read by `ComponentSource` to display the raw source, so
 * always prefix the path with `cn/` (e.g. `cn/accordion/basic.tsx`).
 *
 * Once entries are populated they are intentionally grouped by component (not
 * sorted alphabetically) to mirror `../en/index.ts`, so re-enable the
 * `sort-keys` / `sort-keys-fix` overrides at that point.
 */
export const demos: Record<string, DemoItem> = {};
