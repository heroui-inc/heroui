"use client";

import {CodePanel} from "@/components/code-panel";
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
      showLineNumbers
      fileName="theme.css"
      isVisible={isCodeVisible}
      lang="css"
      sourceCode={cssCode}
      title="index.css"
      onClose={toggleCode}
    />
  );
}
