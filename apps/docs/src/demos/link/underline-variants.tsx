import {Link} from "@heroui/react";

export function LinkUnderlineVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Underline on hover</p>
        <Link className="hover:underline" href="#">
          Hover to see underline animation
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Always visible underline</p>
        <Link className="underline" href="#">
          Underline always visible
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">No underline</p>
        <Link className="no-underline" href="#">
          Link without any underline
          <Link.Icon />
        </Link>
      </div>
    </div>
  );
}
