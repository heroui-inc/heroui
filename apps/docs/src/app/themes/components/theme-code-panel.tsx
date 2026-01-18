"use client";

import {CodePanel} from "@/components/code-panel";
import {CodeBlock} from "@/components/codeblock-client";
import {useCodePanel} from "@/hooks/use-code-panel";

import {useVariablesState} from "../hooks/use-variables-state";
import {getCustomFontInfoFromUrl, isCustomFontUrl} from "../utils/font-utils";
import {generateMinimalCssVariables} from "../utils/generate-css-variables";

export function ThemeCodePanel() {
  const [variables] = useVariablesState();
  const {isCodeVisible, toggleCode} = useCodePanel();

  // Get custom font info if using a URL-based custom font
  const customFontInfo = isCustomFontUrl(variables.fontFamily)
    ? getCustomFontInfoFromUrl(variables.fontFamily)
    : undefined;

  const cssCode = generateMinimalCssVariables(variables, customFontInfo ?? undefined);

  return (
    <CodePanel
      fileName="theme.css"
      isVisible={isCodeVisible}
      sourceCode={cssCode}
      title="Theme CSS Variables"
      onClose={toggleCode}
    >
      <CodeBlock
        showLineNumbers
        allowCopy={false}
        className="docs-code-block docs-code-block-line-numbers"
        title={undefined}
      >
        <pre>
          <code className="language-css">{cssCode}</code>
        </pre>
      </CodeBlock>
    </CodePanel>
  );
}
