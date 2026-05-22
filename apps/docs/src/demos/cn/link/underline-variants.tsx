import {Link} from "@heroui/react";

export function LinkUnderlineVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">悬停时显示下划线</p>
        <Link className="hover:underline" href="#">
          悬停查看下划线动画
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
