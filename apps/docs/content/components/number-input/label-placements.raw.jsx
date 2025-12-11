import {NumberInput} from "@heroui/react";

export default function App() {
  const placements = ["inside", "outside", "outside-left", "outside-top"];

  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex flex-col gap-4">
          {placements.map((placement) => (
            <NumberInput
              key={placement}
              description={placement}
              label="Amount"
              labelPlacement={placement}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex flex-col gap-4">
          {placements.map((placement) => (
            <NumberInput
              key={placement}
              description={placement}
              label="Amount"
              labelPlacement={placement}
              placeholder="Enter a number"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
