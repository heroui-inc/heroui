import type {UrlObject} from "url";

import Image from "next/image";
import Link from "next/link";

import {cn} from "@/utils/cn";

interface DocsImageProps {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  wrapperClassName?: string;
  height?: number;
  priority?: boolean;
  href?: string;
}

export function DocsImage({
  alt,
  className,
  darkSrc,
  height = 1000,
  href,
  priority = true,
  src,
  width = 1000,
  wrapperClassName,
}: DocsImageProps) {
  const wrapperClasses = cn(
    "not-prose relative block aspect-18/9 w-full overflow-hidden rounded-xl border border-separator",
    wrapperClassName,
  );

  const imageContent = darkSrc ? (
    <>
      <Image
        alt={alt}
        className={cn("absolute inset-0 block h-full w-full object-cover dark:hidden", className)}
        height={height}
        priority={priority}
        src={src}
        width={width}
      />
      <Image
        alt={alt}
        className={cn("absolute inset-0 hidden h-full w-full object-cover dark:block", className)}
        height={height}
        priority={priority}
        src={darkSrc}
        width={width}
      />
    </>
  ) : (
    <Image
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain"
      height={height}
      priority={priority}
      src={src}
      width={width}
    />
  );

  if (href) {
    return (
      <Link className={wrapperClasses} href={href as unknown as UrlObject}>
        {imageContent}
      </Link>
    );
  }

  return <div className={wrapperClasses}>{imageContent}</div>;
}
