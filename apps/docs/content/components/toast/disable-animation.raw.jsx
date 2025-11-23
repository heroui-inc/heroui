import {addToast, ToastProvider, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider disableAnimation={true} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
            });
          }}
        >
          Show Toast (No Animation)
        </Button>
      </div>
    </>
  );
}
