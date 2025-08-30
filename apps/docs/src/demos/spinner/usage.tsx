"use client";

import {Button, Spinner} from "@heroui/react";
import {useState} from "react";

export function SpinnerUsage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Loading button */}
      <div className="flex items-center gap-4">
        <Button className="min-w-[120px]" isDisabled={isLoading} onPress={handleClick}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner color="current" size="sm" />
              Loading...
            </div>
          ) : (
            "Click me"
          )}
        </Button>
      </div>

      {/* Loading card */}
      <div className="rounded-lg border p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Spinner color="accent" size="lg" />
            <p className="text-muted text-sm">Loading content...</p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 font-semibold">Content loaded</h3>
            <p className="text-muted text-sm">This content appears after loading completes.</p>
          </div>
        )}
      </div>

      {/* Inline loading */}
      <div className="flex items-center gap-2">
        <span>Processing your request</span>
        {!!isLoading && <Spinner size="sm" />}
      </div>
    </div>
  );
}
