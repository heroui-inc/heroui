"use client";

import {Link, buttonVariants} from "@heroui/react";

export function LinkStyled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link className="text-accent font-semibold" href="#">
        Custom styled link
      </Link>

      <Link className="text-danger hover:text-danger/80 no-underline hover:underline" href="#">
        Danger link
      </Link>

      <Link
        showIcon
        className={buttonVariants({size: "sm", variant: "secondary", className: "px-3"})}
        href="#"
      >
        Button-styled link
        <Link.Icon className="h-3 w-3" />
      </Link>

      <Link showIcon className={buttonVariants({size: "md", variant: "primary"})} href="#">
        Primary button link
        <Link.Icon className="h-4 w-4" />
      </Link>
    </div>
  );
}
