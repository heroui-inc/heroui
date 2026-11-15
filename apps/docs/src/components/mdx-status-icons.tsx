"use client";

import type {ComponentType, ReactNode, SVGProps} from "react";

import {CircleCheckFill, CircleXmarkFill, TriangleExclamationFill} from "@gravity-ui/icons";
import {useParams} from "fumadocs-core/framework";

import {i18n} from "@/lib/i18n";
import {cn} from "@/utils/cn";

type StatusKind = "check" | "cross" | "warning";

const STATUS_ICONS: Record<
  StatusKind,
  {Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string}
> = {
  check: {Icon: CircleCheckFill, className: "text-success"},
  cross: {Icon: CircleXmarkFill, className: "text-danger"},
  warning: {Icon: TriangleExclamationFill, className: "text-warning"},
};

const STATUS_LABELS: Record<string, Record<StatusKind, string>> = {
  cn: {check: "是", cross: "否", warning: "警告"},
  en: {check: "Yes", cross: "No", warning: "Warning"},
};

export type StatusIconProps = {
  /** Visible text after the icon. When present, the icon is decorative and the text names it. */
  children?: ReactNode;
  className?: string;
  /** Accessible name of a bare icon. Defaults to a localized "Yes", "No" or "Warning". */
  label?: string;
};

function StatusIcon({children, className, kind, label}: StatusIconProps & {kind: StatusKind}) {
  const {lang} = useParams();
  const locale = typeof lang === "string" && lang in STATUS_LABELS ? lang : i18n.defaultLanguage;
  const {Icon, className: toneClassName} = STATUS_ICONS[kind];
  const iconClassName = "inline-block size-[1em] shrink-0 align-[-0.125em]";

  if (children == null) {
    return (
      <Icon
        aria-label={label ?? STATUS_LABELS[locale]?.[kind]}
        className={cn(iconClassName, toneClassName, className)}
        data-status={kind}
        focusable={false}
        role="img"
      />
    );
  }

  return (
    <span className={cn("whitespace-nowrap", className)} data-status={kind}>
      <Icon aria-hidden className={cn(iconClassName, "me-1.5", toneClassName)} focusable={false} />
      {children}
    </span>
  );
}

/** Inline replacement for ✅ in MDX content: a green check, read as "Yes" when bare. */
export function StatusCheck(props: StatusIconProps) {
  return <StatusIcon {...props} kind="check" />;
}

/** Inline replacement for ❌ in MDX content: a red cross, read as "No" when bare. */
export function StatusCross(props: StatusIconProps) {
  return <StatusIcon {...props} kind="cross" />;
}

/** Inline replacement for ⚠️ in MDX content: an amber triangle, read as "Warning" when bare. */
export function StatusWarning(props: StatusIconProps) {
  return <StatusIcon {...props} kind="warning" />;
}
