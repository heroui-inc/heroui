import {Select, SelectItem} from "@heroui/react";

export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];

export default function App() {
  const placements = ["inside", "outside", "outside-left", "outside-top"];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex flex-col gap-4">
          {placements.map((placement) => (
            <Select
              key={placement}
              className="max-w-xs"
              label="Favorite Animal"
              labelPlacement={placement}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex flex-col gap-4">
          {placements.map((placement) => (
            <Select
              key={placement}
              className="max-w-xs"
              label="Favorite Animal"
              labelPlacement={placement}
              placeholder="Select an animal"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          ))}
        </div>
      </div>
    </div>
  );
}
