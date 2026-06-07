import {Link} from "@heroui/react";

export function LinkUnderlineVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">默认悬浮下划线</p>
        <Link href="#">
          悬浮以查看下划线
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">始终显示下划线</p>
        <Link className="underline" href="#">
          下划线始终可见
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">无下划线</p>
        <Link className="no-underline" href="#">
          无下划线的链接
          <Link.Icon />
        </Link>
      </div>
    </div>
  );
}
