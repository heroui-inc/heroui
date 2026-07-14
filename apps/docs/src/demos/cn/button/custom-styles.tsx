"use client";

import {Button} from "@heroui/react";

/**
 * 下面的 `gradient-border` 类依赖全局 utility。
 * 使用前请将其添加到全局 CSS（例如 `src/app/globals.css`）：
 *
 * ```css
 * @utility gradient-border {
 *   &::before {
 *     content: "";
 *     position: absolute;
 *     inset: 0;
 *     z-index: 0;
 *     border-radius: inherit;
 *     padding: var(--gradient-border-width, 1px);
 *     background: var(--gradient-border);
 *     pointer-events: none;
 *     -webkit-mask:
 *       linear-gradient(#fff 0 0) content-box,
 *       linear-gradient(#fff 0 0);
 *     -webkit-mask-composite: xor;
 *     mask:
 *       linear-gradient(#fff 0 0) content-box,
 *       linear-gradient(#fff 0 0);
 *     mask-composite: exclude;
 *   }
 * }
 * ```
 *
 * 在组件上通过 Tailwind 任意属性或内联样式设置
 * `--gradient-border`（渐变）以及可选的 `--gradient-border-width`（默认 `1px`）。
 */

export function CustomStyles() {
  return (
    <Button
      className="gradient-border relative z-0 rounded-full bg-linear-to-t from-neutral-100 to-white px-10 py-3 font-[450] text-neutral-800 shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [--gradient-border-width:1.5px] [--gradient-border:linear-gradient(315deg,#e5e5e5_0%,#fafafa_50%,#c4c4c4_100%)] hover:from-white hover:to-neutral-50 hover:brightness-105 active:scale-95 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-800/80 dark:text-neutral-100 dark:[--gradient-border:linear-gradient(315deg,#404040_0%,#262626_50%,#525252_100%)] dark:hover:from-neutral-800 dark:hover:via-neutral-800 dark:hover:to-neutral-900/90"
      variant="ghost"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 6px, rgba(0, 0, 0, 0.02) 0px 3px 12px, rgba(0, 0, 0, 0.01) 0px 8px 24px, rgba(0, 0, 0, 0.02) 0px 18px 40px, rgba(0, 0, 0, 0.02) 0px 40px 80px",
      }}
    >
      升级
    </Button>
  );
}
