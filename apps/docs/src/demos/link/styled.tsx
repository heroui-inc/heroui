"use client";

import {Link, buttonVariants} from "@heroui/react";

export function LinkStyled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link href="#" className="text-accent font-semibold">
        Custom styled link
      </Link>
      
      <Link 
        href="#" 
        className="text-danger hover:text-danger/80 no-underline hover:underline"
      >
        Danger link
      </Link>
      
      <Link
        showIcon
        href="#"
        className={buttonVariants({size: "sm", variant: "secondary", className: "px-3"})}
      >
        Button-styled link
        <Link.Icon className="h-3 w-3" />
      </Link>
      
      <Link
        showIcon
        href="#"
        className={buttonVariants({size: "md", variant: "primary"})}
      >
        Primary button link
        <Link.Icon className="h-4 w-4" />
      </Link>
    </div>
  );
}