"use client";

import {CodePanel} from "@/components/code-panel";
import {CodeBlock} from "@/components/codeblock-client";
import {useCodePanel} from "@/hooks/use-code-panel";

import {useVariablesState} from "../hooks/use-variables-state";
import {generateMinimalCssVariables} from "../utils/generate-css-variables";

export function ThemeCodePanel() {
  const [variables] = useVariablesState();
  const {isCodeVisible, toggleCode} = useCodePanel();
  const cssCode = generateMinimalCssVariables(variables);

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
