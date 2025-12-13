"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";
import type {ComponentProps, RefObject} from "react";

import {buttonVariants} from "@heroui/react";
import {CodeBlock} from "fumadocs-ui/components/codeblock";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {useRef} from "react";

import {Iconify} from "@/components/iconify";
import {cn} from "@/utils/cn";

export function FumadocsCustomCodeblock({
  allowCopy = true,
  children,
  ...props
}: {children: React.ReactNode} & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <CodeBlock
      {...props}
      allowCopy={allowCopy}
      // @ts-expect-error - TODO: fumadocs-ui error
      viewportProps={{ref: areaRef}}
      Actions={(actionsProps) => (
        <div {...actionsProps} className={cn("empty:hidden", actionsProps.className)}>
          {!!allowCopy && <CopyButton containerRef={areaRef} />}
        </div>
      )}
    >
      {children}
    </CodeBlock>
  );
}

function CopyButton({
  className,
  containerRef,
  ...props
}: ComponentProps<"button"> & {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [checked, onClick] = useCopyButton(() => {
    const pre = containerRef.current?.getElementsByTagName("pre").item(0);

    if (!pre) return;

    const clone = pre.cloneNode(true) as HTMLElement;

    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
      node.replaceWith("\n");
    });

    void navigator.clipboard.writeText(clone.textContent ?? "");
  });

  return (
    <button
      aria-label={checked ? "Copied Text" : "Copy Text"}
      data-checked={checked || undefined}
      type="button"
      className={buttonVariants({
        class: cn("-mt-0.5 bg-transparent text-muted", className),
        isIconOnly: true,
        size: "sm",
        variant: "ghost",
      })}
      onClick={onClick}
      {...props}
    >
      {checked ? <Iconify icon="check" /> : <Iconify icon="copy" />}
    </button>
  );
}
