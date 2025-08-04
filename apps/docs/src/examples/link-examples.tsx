"use client";

import React from "react";

import {Link, LinkIcon} from "@heroui/react";

export function LinkBasic() {
  return (
    <Link href="#">
      Call to action{" "}
      <LinkIcon className="absolute -right-2 top-1 text-muted" />
    </Link>
  );
}

export function LinkDisabled() {
  return (
    <Link isDisabled href="#">
      Disabled link{" "}
      <LinkIcon className="absolute -right-2 top-1 text-muted" />
    </Link>
  );
}

export function LinkExternal() {
  return (
    <Link
      href="https://heroui.com"
      target="_blank"
      rel="noopener noreferrer"
      className="button button--md button--tertiary relative h-8 pr-5"
    >
      HeroUI{" "}
      <LinkIcon className="absolute right-3 top-1 h-2 w-2 text-inherit" />
    </Link>
  );
}

export function LinkVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="#" className="text-blue-600 hover:text-blue-700">
        Blue Link
      </Link>
      <Link href="#" className="text-green-600 hover:text-green-700">
        Green Link
      </Link>
      <Link href="#" className="text-purple-600 hover:text-purple-700">
        Purple Link
      </Link>
    </div>
  );
}