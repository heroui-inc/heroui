import {Typography} from "@heroui/react";

export const Prose = () => {
  return (
    <Typography.Prose className="flex max-w-xl flex-col gap-3">
      <h1>正文标题</h1>
      <p>Prose 适用于标记已是语义化、由 HeroUI 应用默认排版节奏的写作型内容。</p>
      <h2>章节标题</h2>
      <p>
        行内代码如 <code>render</code> 与 Typography 原语获得相同的代码样式处理。
      </p>
    </Typography.Prose>
  );
};
