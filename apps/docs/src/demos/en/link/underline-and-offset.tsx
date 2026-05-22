import {Link} from "@heroui/react";

export function LinkUnderlineAndOffset() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Always visible underline</p>
        <Link className="underline" href="#">
          Underline always visible
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Underline visible on hover</p>
        <Link className="no-underline hover:underline" href="#">
          Hover to see the underline
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

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Changing the underline offset</p>
        <div className="flex flex-col gap-3">
          <Link className="underline-offset-1 hover:underline" href="#">
            Offset 1 (1px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-2 hover:underline" href="#">
            Offset 2 (2px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-3 hover:underline" href="#">
            Offset 3 (3px space)
            <Link.Icon />
          </Link>
          <Link className="underline-offset-4 hover:underline" href="#">
            Offset 4 (4px space)
            <Link.Icon />
          </Link>
        </div>
      </div>
    </div>
  );
}
