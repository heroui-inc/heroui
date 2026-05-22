import {Link} from "@heroui/react";

export function LinkUnderlineOffset() {
  return (
    <div className="flex flex-col gap-4">
      <Link className="underline-offset-1 hover:underline" href="#">
        Offset 1
        <Link.Icon />
      </Link>
      <Link className="underline-offset-2 hover:underline" href="#">
        Offset 2
        <Link.Icon />
      </Link>
      <Link className="underline-offset-3 hover:underline" href="#">
        Offset 3
        <Link.Icon />
      </Link>
    </div>
  );
}
