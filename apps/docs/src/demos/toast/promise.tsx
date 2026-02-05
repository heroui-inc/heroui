"use client";

import {Button, toast} from "@heroui/react";

const simulateSuccess = (): Promise<{message: string}> => {
  return new Promise<{message: string}>((resolve) => {
    setTimeout(() => resolve({message: "File uploaded successfully"}), 2000);
  });
};

const simulateError = (): Promise<never> => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Upload failed. Please try again.")), 2000);
  });
};

const simulateRandom = (): Promise<{count: number}> => {
  return new Promise<{count: number}>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({count: 42});
      } else {
        reject(new Error("Random error occurred"));
      }
    }, 2000);
  });
};

export function PromiseDemo() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateSuccess(), {
              error: "Upload failed. Please try again.",
              loading: "Uploading file...",
              success: "File uploaded successfully",
            });
          }}
        >
          Promise (success)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateError(), {
              error: (err) => err.message,
              loading: "Processing request...",
              success: "Request completed",
            });
          }}
        >
          Promise (error)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateRandom(), {
              error: (err) => err.message,
              loading: "Loading data...",
              success: (data) => `Loaded ${data.count} items`,
            });
          }}
        >
          Promise (random)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const loadingId = toast("Processing your request...", {
              description: "Please wait while we process your data",
              isLoading: true,
              timeout: 0,
            });

            setTimeout(() => {
              toast.close(loadingId);
              toast.success("Request processed successfully", {
                description: "Your data has been processed",
              });
            }, 2000);
          }}
        >
          Manual loading
        </Button>
      </div>
    </div>
  );
}
