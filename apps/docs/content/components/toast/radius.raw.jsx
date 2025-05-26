import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        ["None", "none"],
        ["Small", "sm"],
        ["Medium", "md"],
        ["Large", "lg"],
        ["Full", "full"],
      ].map((radius) => (
        <Button
          key={radius[1]}
          radius={radius[1]}
          variant={"flat"}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              radius: radius[1],
            })
          }
        >
          {radius[0]}
        </Button>
      ))}
    </div>
  );
}
