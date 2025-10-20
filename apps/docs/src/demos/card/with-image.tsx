"use client";

import {Card, CardFooter} from "@heroui/react";

export function WithImage() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="w-[220px] gap-2 p-1">
        <img
          alt="Luxury cars collection"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
        />
        <CardFooter className="flex items-center justify-between px-2 text-sm">
          <span>Cars</span>
          <span aria-label="18 pictures in collection" className="text-muted">
            18 pictures
          </span>
        </CardFooter>
      </Card>

      <Card className="w-[220px] gap-2 p-1">
        <img
          alt="Modern office workspace"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/workspace.jpeg"
        />
        <CardFooter className="flex items-center justify-between px-2 text-sm">
          <span>Workspaces</span>
          <span aria-label="56 pictures in collection" className="text-muted">
            56 pictures
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
