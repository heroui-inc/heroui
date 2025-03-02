import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Default", "Primary", "Secondary", "Success", "Warning", "Danger"].map((color) => (
        <Button
          key={color}
          color={color.toLowerCase()}
          variant={"flat"}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              color: color.toLowerCase(),
            })
          }
        >
          {color}
        </Button>
      ))}
    </div>
  );
}
