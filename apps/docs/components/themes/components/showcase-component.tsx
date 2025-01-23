import {Divider} from "@heroui/react";

interface ShowcaseComponentProps {
  children: React.ReactElement | React.ReactElement[];
  id?: string;
  name: string;
}

export function ShowcaseComponent({children, id, name}: ShowcaseComponentProps) {
  return (
    <div className="bg-background text-foreground py-6 pe-4" id={id}>
      <span className="text-xl font-medium text-default-800">{name}</span>
      <Divider className="mt-4 mb-6" />
      <div className="flex flex-wrap gap-6 mt-8">{children}</div>
    </div>
  );
}
