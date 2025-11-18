import Image from "next/image";

interface DocsImageProps {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function DocsImage({
  alt,
  className = "h-[220px] md:h-[340px]",
  darkSrc,
  height = 1000,
  priority = true,
  src,
  width = 1000,
}: DocsImageProps) {
  const wrapperClasses = `not-prose border border-separator relative w-full overflow-hidden rounded-xl ${className}`;

  if (darkSrc) {
    return (
      <div className={wrapperClasses}>
        <Image
          alt={alt}
          className="absolute inset-0 block h-full w-full object-cover dark:hidden"
          height={height}
          priority={priority}
          src={src}
          width={width}
        />
        <Image
          alt={alt}
          className="absolute inset-0 hidden h-full w-full object-cover dark:block"
          height={height}
          priority={priority}
          src={darkSrc}
          width={width}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Image
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        height={height}
        priority={priority}
        src={src}
        width={width}
      />
    </div>
  );
}
