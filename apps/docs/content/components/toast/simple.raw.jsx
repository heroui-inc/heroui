import {addToast, Button, ToastProvider} from "@heroui/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <div className="flex flex-wrap gap-2">
        <Button
          onPress={() => {
            addToast({
              title: "Success",
              description: "Your changes have been saved successfully.",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
    </>
  );
}
