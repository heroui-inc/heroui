import {Link} from "@heroui/react";

export function CustomStyles() {
  return (
    <Link
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground/80"
      href="#"
    >
      Call to action
      <Link.Icon />
    </Link>
  );
}
