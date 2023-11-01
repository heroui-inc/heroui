const data = `export const animals = [
  {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", value: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", value: "elephant", description: "The largest land animal"},
  {label: "Lion", value: "lion", description: "The king of the jungle"},
  {label: "Tiger", value: "tiger", description: "The largest cat species"},
  {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", value: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];`;

const App = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const myFilter = (text, substring) => {
    if (substring.length === 0) {
      return true;
    }

    // Normalize both strings so we can slice safely
    // take into account the ignorePunctuation option as well...
    text = text.normalize("NFC").toLocaleLowerCase();
    substring = substring.normalize("NFC").toLocaleLowerCase();

    return text.slice(0, substring.length) === substring.toLowerCase();
  };

  return (
    <div className="p-6">
      <Autocomplete
        allowsCustomValue
        className="max-w-xs"
        defaultFilter={myFilter}
        defaultItems={animals}
        label="Search an animal"
        variant="bordered"
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}`;

const AppTs = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const myFilter = (text: string, substring: string) => {
    if (substring.length === 0) {
      return true;
    }

    // Normalize both strings so we can slice safely
    // take into account the ignorePunctuation option as well...
    text = text.normalize("NFC").toLocaleLowerCase();
    substring = substring.normalize("NFC").toLocaleLowerCase();

    return text.slice(0, substring.length) === substring.toLowerCase();
  };

  return (
    <div className="p-6">
      <Autocomplete
        className="max-w-xs"
        defaultFilter={myFilter}
        defaultItems={animals}
        label="Search an animal"
        variant="bordered"
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
