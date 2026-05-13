import {CodeBlock} from "./codeblock";

export function CollapsibleCode({
  className = "",
  code,
  collapsible = true,
  lang = "tsx",
  showLineNumbers = true,
  title = "",
}: {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  title?: string;
  className?: string;
  collapsible?: boolean;
}) {
  return (
    <CodeBlock
      isIsolated
      className={className}
      code={code}
      collapsible={collapsible}
      lang={lang}
      showLineNumbers={showLineNumbers}
      title={title}
    />
  );
}
