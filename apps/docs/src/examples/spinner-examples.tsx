"use client";

import React from "react";

import {Spinner} from "@heroui/react";

export function SpinnerBasic() {
  return <Spinner />;
}

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}

export function SpinnerColors() {
  return (
    <div className="flex items-center gap-4">
      <Spinner color="primary" />
      <Spinner color="accent" />
      <Spinner color="neutral" />
    </div>
  );
}

export function SpinnerWithLabel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm">Loading...</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-sm text-muted-foreground">Please wait</span>
      </div>
    </div>
  );
}