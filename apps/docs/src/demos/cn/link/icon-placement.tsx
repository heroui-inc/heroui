import {Link} from "@heroui/react";

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        图标在末尾（默认）
        <Link.Icon />
      </Link>
      <Link className="gap-1" href="#">
        <Link.Icon />
        图标在开头
      </Link>
    </div>
  );
}
