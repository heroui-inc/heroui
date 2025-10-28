import {Link} from "@heroui/react";

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <Link.Root href="#">
        Icon at end (default)
        <Link.Icon />
      </Link.Root>
      <Link.Root className="gap-1" href="#">
        <Link.Icon />
        Icon at start
      </Link.Root>
    </div>
  );
}
