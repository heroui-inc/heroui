"use client";

import {Blockquote} from "./components/blockquote";

export const DeprecationMessage = () => {
  return (
    <Blockquote color="warning">
      <b>HeroUI v3 is here!</b> We recommend starting new projects with{" "}
      <a className="underline" href="https://heroui.com/" rel="noopener noreferrer" target="_blank">
        <b>HeroUI v3</b>
      </a>
      . v2 will continue to receive patches and critical fixes.
    </Blockquote>
  );
};
