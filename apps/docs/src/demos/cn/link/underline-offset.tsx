import {Link} from "@heroui/react";

export function LinkUnderlineOffset() {
  return (
    <div className="flex flex-col gap-4">
      <Link className="underline-offset-1" href="#">
        偏移 1
        <Link.Icon />
      </Link>
      <Link className="underline-offset-2" href="#">
        偏移 2
        <Link.Icon />
      </Link>
      <Link className="underline-offset-3" href="#">
        偏移 3
        <Link.Icon />
      </Link>
    </div>
  );
}
