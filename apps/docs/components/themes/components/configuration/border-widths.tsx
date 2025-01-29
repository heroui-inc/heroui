import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import EditableButton from "./editable-button";

import {Crop} from "@/components/icons/crop";

export function BorderWidths() {
  const {borderWidthValue, setBorderWidthValue} = useThemeBuilder();

  return (
    <ConfigSection icon={<Crop className="w-4 h-4" />} title="Border width">
      <EditableButton
        className="rounded-tl-md border-t-1 border-l-1"
        setValue={setBorderWidthValue}
        title="thin"
        value={borderWidthValue}
      />
      <EditableButton
        className="rounded-tl-md border-t-2 border-l-2"
        setValue={setBorderWidthValue}
        title="medium"
        value={borderWidthValue}
      />
      <EditableButton
        className="rounded-tl-md border-t-4 border-l-4"
        setValue={setBorderWidthValue}
        title="thick"
        value={borderWidthValue}
      />
    </ConfigSection>
  );
}
