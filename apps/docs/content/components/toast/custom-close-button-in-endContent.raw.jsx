import {Button, addToast} from "@heroui/react";

export default function App() {
  return (
    <Button
      variant="flat"
      onPress={() => {
        addToast({
          title: "Successful!",
          endContent: (onClose) => (
            <Button color="danger" size="sm" variant="flat" onPress={onClose}>
              Close
            </Button>
          ),
        });
      }}
    >
      Show Toast
    </Button>
  );
}
