import type {UrlObject} from "url";

import Image from "next/image";
import Link from "next/link";

interface DocsImageProps {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  href?: string;
}

export function DocsImage({
  alt,
  className = "h-[220px] md:h-[340px]",
  darkSrc,
  height = 1000,
  href,
  priority = true,
  src,
  width = 1000,
}: DocsImageProps) {
  const wrapperClasses = `block not-prose border border-separator relative w-full overflow-hidden rounded-xl ${className}`;

  const imageContent = darkSrc ? (
    <>
      <Image
        alt={alt}
        className="absolute inset-0 block h-full w-full object-contain dark:hidden"
        height={height}
        priority={priority}
        src={src}
        width={width}
      />
      <Image
        alt={alt}
        className="absolute inset-0 hidden h-full w-full object-contain dark:block"
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
