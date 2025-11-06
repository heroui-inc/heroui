"use client";

import Image from "next/image";
import {useTheme} from "next-themes";
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
  const {resolvedTheme, theme} = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const wrapperClasses = `not-prose border border-divider relative w-full overflow-hidden rounded-xl ${className}`;

  if (darkSrc) {
    return (
      <div className={wrapperClasses}>
        <Image
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          height={1000}
          src={currentTheme === "dark" ? darkSrc : src}
          width={1000}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Image
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        height={1000}
        src={src}
        width={1000}
      />
    </div>
  );
}
