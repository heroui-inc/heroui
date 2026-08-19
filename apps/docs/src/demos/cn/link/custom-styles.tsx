import {Link} from "@heroui/react";

export function CustomStyles() {
  return (
    <Link
      className="font-medium text-neutral-700 underline decoration-neutral-300/80 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:decoration-neutral-600/80 dark:hover:text-neutral-100"
      href="#"
    >
      立即行动
      <Link.Icon />
    </Link>
  );
}
