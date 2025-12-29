"use client";

import {useInstantDBAuth} from "@/lib/auth";

export function AuthCheck() {
  useInstantDBAuth();

  return null;
}
