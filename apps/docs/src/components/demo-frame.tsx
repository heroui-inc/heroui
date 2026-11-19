import type {HTMLAttributes} from "react";

import {cn} from "@/utils/cn";

export type DemoFrameSize = "sm" | "md";

interface DemoFrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Frame thickness: `md` for full-width demos, `sm` for cards. */
  size?: DemoFrameSize;
  /** Classes for the inner stage, which sits on the page background. */
  stageClassName?: string;
}

// The outer radius is the stage radius plus the frame padding, so the corners stay concentric.
const FRAME_CLASSES: Record<DemoFrameSize, string> = {
  md: "rounded-[20px] p-2",
  sm: "rounded-[18px] p-1",
};

/** The demo preview look: a page-background stage inside a tinted, rounded frame. */
export function DemoFrame({
  children,
  className,
  size = "md",
  stageClassName,
  ...props
}: DemoFrameProps) {
  return (
    <div className={cn("bg-(--docs-demo)", FRAME_CLASSES[size], className)} {...props}>
      <div className={cn("relative overflow-hidden rounded-[14px] bg-background", stageClassName)}>
        {children}
      </div>
    </div>
  );
}
