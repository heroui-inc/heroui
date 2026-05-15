import {ArrowUpRightFromSquare, Link as LinkIcon} from "@gravity-ui/icons";
import {Link} from "@heroui/react";

export function LinkCustomIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        外部链接
        <Link.Icon className="ml-1.5 size-3">
          <ArrowUpRightFromSquare />
        </Link.Icon>
      </Link>
      <Link className="gap-1" href="#">
        前往页面
        <Link.Icon className="size-3">
          <LinkIcon />
        </Link.Icon>
      </Link>
    </div>
  );
}
