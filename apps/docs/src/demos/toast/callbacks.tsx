"use client";

import {Button, toast} from "@heroui/react";
import React from "react";

export function Callbacks() {
  const [closedHistory, setClosedHistory] = React.useState<Array<{message: string; time: string}>>(
    [],
  );

  const addToHistory = (message: string) => {
    const time = new Date().toLocaleTimeString();

    setClosedHistory((prev) => [{message, time}, ...prev].slice(0, 5));
  };

  return (
    <div className="flex h-full max-w-2xl flex-col items-center justify-center gap-6">
      {/* Toast Buttons */}
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("File saved", {
              onClose: () => {
                addToHistory("File saved (closed after 3 seconds)");
              },
              timeout: 3000,
            })
          }
        >
          Custom timeout (3s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("Changes saved", {
              onClose: () => {
                addToHistory("Changes saved (closed after 10 seconds)");
              },
              timeout: 10000,
            })
          }
        >
          Custom timeout (10s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("Event created", {
              onClose: () => {
                addToHistory("Event created (closed after default timeout)");
              },
            })
          }
        >
          With onClose callback
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("Important notification", {
              description: "This toast will stay until dismissed",
              onClose: () => {
                addToHistory("Important notification (manually closed)");
              },
              timeout: 0,
            })
          }
        >
          Persistent toast
        </Button>
      </div>

      {/* Closed History Panel */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Closed History</h3>
          {closedHistory.length > 0 && (
            <Button
              className="h-6 text-xs"
              size="sm"
              variant="tertiary"
              onPress={() => setClosedHistory([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="min-h-[120px] space-y-2 rounded-lg border border-border bg-surface p-4">
          {closedHistory.length === 0 ? (
            <p className="text-sm text-muted">No toasts closed yet. Try closing one above!</p>
          ) : (
            closedHistory.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="flex animate-in items-start justify-between gap-3 rounded-md border border-border bg-default px-3 py-2 text-sm duration-200 fade-in slide-in-from-top-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex-1">
                  <span className="font-medium">{item.message}</span>
                  <span className="ml-2 text-xs text-muted">({item.time})</span>
                </div>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
