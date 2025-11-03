import {Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function LinkCustomIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        External link
        <Link.Icon className="ml-1.5 size-3">
          <Icon icon="gravity-ui:arrow-up-right-from-square" />
        </Link.Icon>
      </Link>
      <Link className="gap-1" href="#">
        Go to page
        <Link.Icon className="size-3">
          <Icon icon="gravity-ui:link" />
        </Link.Icon>
      </Link>
    </div>
  );
}
