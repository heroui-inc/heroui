import React from "react";

interface DocsImageProps {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
}

export function DocsImage({
  alt,
  className = "h-[220px] md:h-[340px]",
  darkSrc,
  src,
}: DocsImageProps) {
  const wrapperClasses = `not-prose border border-divider relative w-full overflow-hidden rounded-xl ${className}`;

  if (darkSrc) {
    return (
      <div className={wrapperClasses}>
        <img
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out dark:opacity-100"
          src={darkSrc}
        />
        <img
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 ease-in-out dark:opacity-0"
          src={src}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <img alt={alt} className="absolute inset-0 h-full w-full object-cover" src={src} />
    </div>
  );
}
