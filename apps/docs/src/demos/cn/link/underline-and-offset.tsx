import {Link} from "@heroui/react";

export function LinkUnderlineAndOffset() {
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
          不带任何下划线的链接
          <Link.Icon />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">调整下划线偏移</p>
        <div className="flex flex-col gap-3">
          <Link className="underline-offset-1" href="#">
            偏移 1（1px 间距）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-2" href="#">
            偏移 2（2px 间距）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-3" href="#">
            偏移 3（3px 间距）
            <Link.Icon />
          </Link>
          <Link className="underline-offset-4" href="#">
            偏移 4（4px 间距）
            <Link.Icon />
          </Link>
        </div>
      </div>
    </div>
  );
}
