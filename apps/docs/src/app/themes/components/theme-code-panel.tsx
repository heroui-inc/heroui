"use client";

import {useDeferredValue} from "react";

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

  // Defer the CSS code value to prevent expensive syntax highlighting
  // from blocking high-priority UI updates (like color sliders).
  // This allows the theme preview to stay responsive while the code panel
  // updates on a lower priority schedule.
  // See: https://www.joshwcomeau.com/react/use-deferred-value/
  const deferredCssCode = useDeferredValue(cssCode);

  return (
    <CodePanel
      showLineNumbers
      fileName="theme.css"
      isVisible={isCodeVisible}
      lang="css"
      sourceCode={deferredCssCode}
      title="index.css"
      onClose={toggleCode}
    />
  );
}
