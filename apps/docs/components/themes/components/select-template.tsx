import {Select, SelectItem} from "@heroui/react";

import {templates} from "../templates";
import {ConfigColors, Template, TemplateType} from "../types";

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
      <div className="flex gap-1 items-center pb-2 text-default-500">
        <MirrorLeft className="w-4 h-4 fill-current" />
        <div className="text-sm">Prebuilt Themes</div>
      </div>
      <Select
        classNames={{
          innerWrapper: "my-2",
        }}
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

interface SwatchProps {
  colors: ConfigColors["baseColor"];
}

function Swatch({colors}: SwatchProps) {
  return (
    <div className="flex h-6 rounded-lg">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="w-2 h-full" style={{background: value}} />
      ))}
    </div>
  );
}
