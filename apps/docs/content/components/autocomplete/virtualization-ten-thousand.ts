const App = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

const generateItems = (n) => {
  const items = [
    "Cat",
    "Dog",
    "Elephant",
    "Lion",
    "Tiger",
    "Giraffe",
    "Dolphin",
    "Penguin",
    "Zebra",
    "Shark",
    "Whale",
    "Otter",
    "Crocodile",
  ];

  const dataset = [];

  for (let i = 0; i < n; i++) {
    const item = items[i % items.length];

    dataset.push({
      label: \`\${item}\${i}\`,
      value: \`\${item.toLowerCase()}\${i}\`,
      description: "Sample description",
    });
  }

  return dataset;
};

export default function App() {
  const items = generateItems(10000);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete 
        isVirtualized
        label="Search from 1000 items" 
        className="max-w-xs"
        defaultItems={items}
        placeholder="Search..."
      >
        {(item) => (
          <AutocompleteItem key={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
