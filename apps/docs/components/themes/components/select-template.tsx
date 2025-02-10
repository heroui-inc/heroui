import {Select, SelectItem} from "@heroui/react";

import {templates} from "../templates";
import {Template, TemplateType} from "../types";

import Swatch from "./configuration/swatch";

import {MirrorLeft} from "@/components/icons";

interface SelectTemplateProps {
  name: TemplateType | null;
  onChange: (template: Template) => void;
}

export function SelectTemplate({name, onChange}: SelectTemplateProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as TemplateType;
    const template = templates.find((template) => template.name === value);

    if (template) {
      onChange(template);
    }
  }

  return (
    <>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-lg leading-7 font-medium flex gap-1.5 items-center">
        <MirrorLeft className="w-5 h-5 fill-current" />
        <div>Prebuilt Themes</div>
      </div>
      <Select
        className="my-3"
        placeholder="Select a theme"
        selectedKeys={name === null ? [] : [name]}
        onChange={handleChange}
      >
        {templates.map((template, index) => (
          <SelectItem
            key={template.name}
            startContent={<Swatch colors={template.value.light.baseColor} />}
            value={index}
          >
            {template.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
