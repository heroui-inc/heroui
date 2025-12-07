import {Description, Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupBasic() {
  return (
    <TagGroup>
      <Label>Categories</Label>
      <TagGroup.List>
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup.List>
      <Description>Select categories that interest you</Description>
    </TagGroup>
  );
}
