"use client";

import {Blockquote} from "./components/blockquote";

export const DeprecationMessage = () => {
  return (
    <Blockquote color="warning">
      ⚠️ <b>Deprecation Notice:</b> HeroUI v2 will be deprecated soon. We recommend to use{" "}
      <a
        className="underline"
        href="http://v3.heroui.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <b>HeroUI v3</b>
      </a>{" "}
      for the new projects.
    </Blockquote>
  );
};
