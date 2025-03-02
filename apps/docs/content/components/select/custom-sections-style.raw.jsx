import {Select, SelectItem, SelectSection} from "@heroui/react";

export default function App() {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Select
      className="max-w-xs"
      label="Favorite Animal"
      placeholder="Select an animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Mammals"
      >
        <SelectItem key="Lion">Lion</SelectItem>
        <SelectItem key="Tiger">Tiger</SelectItem>
        <SelectItem key="Elephant">Elephant</SelectItem>
        <SelectItem key="Kangaroo">Kangaroo</SelectItem>
        <SelectItem key="Panda">Panda</SelectItem>
        <SelectItem key="Giraffe">Giraffe</SelectItem>
        <SelectItem key="Zebra">Zebra</SelectItem>
        <SelectItem key="Cheetah">Cheetah</SelectItem>
      </SelectSection>
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Birds"
      >
        <SelectItem key="Eagle">Eagle</SelectItem>
        <SelectItem key="Parrot">Parrot</SelectItem>
        <SelectItem key="Penguin">Penguin</SelectItem>
        <SelectItem key="Ostrich">Ostrich</SelectItem>
        <SelectItem key="Peacock">Peacock</SelectItem>
        <SelectItem key="Swan">Swan</SelectItem>
        <SelectItem key="Falcon">Falcon</SelectItem>
        <SelectItem key="Flamingo">Flamingo</SelectItem>
      </SelectSection>
    </Select>
  );
}
