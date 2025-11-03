import {Label, ListBox, Select} from "@heroui/react";

export function WithDisabledOptions() {
  return (
    <Select className="w-[256px]" disabledKeys={["cat", "kangaroo"]} placeholder="Select an animal">
      <Label>Animal</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Content>
        <ListBox>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="bird" textValue="Bird">
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="elephant" textValue="Elephant">
            Elephant
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="tiger" textValue="Tiger">
            Tiger
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Content>
    </Select>
  );
}
