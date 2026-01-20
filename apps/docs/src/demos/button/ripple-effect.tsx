"use client";

import {Button} from "@heroui/react";
import {Ripple} from "m3-ripple";

import "m3-ripple/ripple.css";

export function RippleEffect() {
  return (
    <Button className="relative bg-[#6200ee] px-8 py-4 text-white">
      <Ripple />
      Click me
    </Button>
  );
}
