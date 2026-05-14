import type {ReactNode} from "react";

export default function ShowcaseLayout({children}: {children: ReactNode}) {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-[68rem]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">展示</h1>
        <p className="mb-12 text-lg font-light text-muted">
          浏览交互式示例，了解 HeroUI 组件在真实场景中的用法。
        </p>
        {children}
      </div>
    </main>
  );
}
