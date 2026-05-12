import {ArrowUpRightFromSquare, Link as LinkIcon} from "@gravity-ui/icons";
import {Link} from "@heroui/react";

export function LinkCustomIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        External link
        <Link.Icon className="ml-1.5 size-3">
          <ArrowUpRightFromSquare />
        </Link.Icon>
      </Link>
      <Link className="gap-1" href="#">
        Go to page
        <Link.Icon className="size-3">
          <LinkIcon />
        </Link.Icon>
      </Link>
    </div>
  );
}
