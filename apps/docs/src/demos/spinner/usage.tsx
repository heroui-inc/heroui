"use client";

import {useState} from "react";
import {Spinner, Button} from "@heroui/react";

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
        <Button 
          onPress={handleClick}
          isDisabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" color="current" />
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
            <Spinner size="lg" color="accent" />
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
        {isLoading && <Spinner size="sm" />}
      </div>
    </div>
  );
}