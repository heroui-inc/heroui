import {Select, SelectItem} from "@heroui/react";

import {templates} from "../templates";
import {Template, TemplateType} from "../types";

import Swatch from "./configuration/swatch";

import {MirrorLeft} from "@/components/icons";

interface SelectTemplateProps {
  name: TemplateType | null;
  onChange: (template: Template) => void;
  currentTheme: string | undefined;
}

export function SelectTemplate({name, onChange, currentTheme}: SelectTemplateProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as TemplateType;
    const template = templates.find((template) => template.name === value);

    if (template) {
      onChange(template);
    }
  }

  return (
    <>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-md leading-7 font-medium flex gap-1.5 items-center">
        <MirrorLeft className="w-4 h-4 fill-current" />
        <div>Prebuilt Themes</div>
      </div>
      <Select
        className="my-3"
        classNames={{
          trigger: "bg-default-200",
        }}
        placeholder="Select a theme"
        selectedKeys={name === null ? [] : [name]}
        onChange={handleChange}
      >
        {templates.map((template, index) => (
          <SelectItem
            key={template.name}
            startContent={
              <Swatch
                colors={
                  currentTheme === "dark"
                    ? template.value.dark.baseColor
                    : template.value.light.baseColor
                }
              />
            }
            // @ts-ignore
            value={index}
          >
            {template.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
