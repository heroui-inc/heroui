"use client";

import {CardContent, CardDescription, CardHeader, CardRoot, CardTitle} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <CardRoot className="w-[320px]" variant="flat">
        <CardHeader>
          <CardTitle>Variant Flat</CardTitle>
          <CardDescription>Transparent background with no border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with no variant styling</p>
        </CardContent>
      </CardRoot>

      <CardRoot className="w-[320px]" variant="outlined">
        <CardHeader>
          <CardTitle>Variant Outlined</CardTitle>
          <CardDescription>This card uses outlined variant (default)</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with subtle elevation</p>
        </CardContent>
      </CardRoot>

      <CardRoot className="w-[320px]" variant="elevated">
        <CardHeader>
          <CardTitle>Variant Elevated</CardTitle>
          <CardDescription>This card uses elevated variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with medium elevation</p>
        </CardContent>
      </CardRoot>

      <CardRoot className="w-[320px]" variant="filled">
        <CardHeader>
          <CardTitle>Variant Filled</CardTitle>
          <CardDescription>This card uses filled variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with higher elevation</p>
        </CardContent>
      </CardRoot>
    </div>
  );
}
