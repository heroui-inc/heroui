import {Link} from "@heroui/react";

export function LinkUnderlineVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Underline on hover (default)</p>
        <Link href="#" underline="hover">
          Hover to see underline animation
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Always visible underline</p>
        <Link href="#" underline="always">
          Underline always visible
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">No underline</p>
        <Link href="#" underline="none">
          Link without any underline
          <Link.Icon />
        </Link>
      </div>
    </div>
  );
}
