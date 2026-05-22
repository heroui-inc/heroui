import {Link} from "@heroui/react";

export function LinkUnderlineAndOffset() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">始终显示下划线</p>
        <Link className="underline" href="#">
          下划线始终可见
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">悬停时显示下划线</p>
        <Link className="no-underline hover:underline" href="#">
          悬停查看下划线
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

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">调整下划线偏移</p>
        <div className="flex flex-col gap-3">
          <Link className="underline-offset-1 hover:underline" href="#">
            偏移 1（间距 1px）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-2 hover:underline" href="#">
            偏移 2（间距 2px）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-3 hover:underline" href="#">
            偏移 3（间距 3px）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-4 hover:underline" href="#">
            偏移 4（间距 4px）
            <Link.Icon />
          </Link>
        </div>
      </div>
    </div>
  );
}
