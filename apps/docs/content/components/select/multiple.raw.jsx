import {Select, SelectItem} from "@vezham/react";

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
  return (
    <Select
      className="max-w-xs"
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
}
