"use client";

import {Blockquote} from "./components/blockquote";

export const DeprecationMessage = () => {
  return (
    <Blockquote color="warning">
      ⚠️ <b>Deprecation Notice:</b> HeroUI v2 is deprecated. We recommend starting with{" "}
      <a className="underline" href="https://heroui.com/" rel="noopener noreferrer" target="_blank">
        <b>HeroUI v3</b>
      </a>{" "}
      for new projects.
    </Blockquote>
  );
};
