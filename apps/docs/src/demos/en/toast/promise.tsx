"use client";

import {Button, toast} from "@heroui/react";

const uploadFile = (): Promise<{filename: string; size: number}> => {
  return new Promise<{filename: string; size: number}>((resolve) => {
    setTimeout(() => resolve({filename: "document.pdf", size: 1024}), 2000);
  });
};

const createEvent = (): Promise<never> => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Network error. Please try again.")), 2000);
  });
};

const saveData = (): Promise<{count: number}> => {
  return new Promise<{count: number}>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({count: 42});
      } else {
        reject(new Error("Failed to save data"));
      }
    }, 2000);
  });
};

const fetchUser = (): Promise<{name: string; email: string}> => {
  return new Promise<{name: string; email: string}>((resolve) => {
    setTimeout(() => resolve({email: "john@example.com", name: "John Doe"}), 2000);
  });
};

export function PromiseDemo() {
  return (
    <div className="flex h-full max-w-2xl flex-col items-center justify-center gap-8">
      {/* Promise API Section */}
      <div className="w-full space-y-3">
        <div className="text-center">
          <h3 className="text-sm font-medium">Using toast.promise()</h3>
          <p className="text-xs text-muted">
            Automatically handles loading, success, and error states
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(uploadFile(), {
                error: "Failed to upload file",
                loading: "Uploading file...",
                success: (data) => `File ${data.filename} uploaded (${data.size}KB)`,
              });
            }}
          >
            Upload file
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(createEvent(), {
                error: (err) => err.message,
                loading: "Creating event...",
                success: "Event created",
              });
            }}
          >
            Create event (error)
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(saveData(), {
                error: (err) => err.message,
                loading: "Saving changes...",
                success: (data) => `Saved ${data.count} items`,
              });
            }}
          >
            Save data (random)
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(fetchUser(), {
                error: "Failed to fetch user",
                loading: "Loading user...",
                success: (data) => `Welcome back, ${data.name}!`,
              });
            }}
          >
            Fetch user
          </Button>
        </div>
      </div>

      {/* Manual Loading Section */}
      <div className="w-full space-y-3">
        <div className="text-center">
          <h3 className="text-sm font-medium">Manual Loading State</h3>
          <p className="text-xs text-muted">Manually control loading state with isLoading prop</p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("Uploading file...", {
                description: "Please wait while we upload your file",
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.success("File uploaded", {
                  description: "Your file has been uploaded successfully",
                });
              }, 3000);
            }}
          >
            Upload with loading
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("Processing payment...", {
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.success("Payment processed", {
                  description: "Your payment has been processed successfully",
                });
              }, 2500);
            }}
          >
            Payment processing
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("Saving changes...", {
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.danger("Failed to save", {
                  description: "Please try again",
                });
              }, 2000);
            }}
          >
            Loading to error
          </Button>
        </div>
      </div>
    </div>
  );
}
