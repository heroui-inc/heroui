import {Link} from "@heroui/react";

export function LinkUnderlineOffset() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="#" underline="hover" underlineOffset={1}>
        Offset 1 (default)
        <Link.Icon />
      </Link>
      <Link href="#" underline="hover" underlineOffset={2}>
        Offset 2
        <Link.Icon />
      </Link>
      <Link href="#" underline="hover" underlineOffset={3}>
        Offset 3
        <Link.Icon />
      </Link>
    </div>
  );
}
