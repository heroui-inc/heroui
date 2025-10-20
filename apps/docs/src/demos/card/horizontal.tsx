"use client";

import {Button, Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@heroui/react";

export function Horizontal() {
  return (
    <Card className="w-full items-stretch md:flex-row">
      <img
        alt="Porsche 911 Golden Edition"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
      />
      <div className="flex flex-1 flex-col gap-3">
        <CardHeader className="gap-1">
          <CardTitle>Get the new Porsche 911 golden edition</CardTitle>
          <CardDescription>
            Experience unmatched luxury and performance with the Porsche 911 Golden Edition—where
            sleek design meets cutting-edge tech and pure driving thrill.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 36,799 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $36,799
            </span>
            <span aria-label="Available stock: 11 units" className="text-muted text-xs">
              11 available
            </span>
          </div>
          <Button>Buy Now</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
