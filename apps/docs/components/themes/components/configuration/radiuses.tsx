import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import EditableButton from "./editable-button";

import {CropMinimalistic} from "@/components/icons/crop";

export function Radiuses() {
  const {radiusValue, setRadiusValue} = useThemeBuilder();

  return (
    <ConfigSection icon={<CropMinimalistic className="h-5 w-5" />} title="Radius">
      <EditableButton
        className="rounded-tl-none"
        setValue={setRadiusValue}
        title="none"
        value={radiusValue}
      />
      <EditableButton
        className="rounded-tl-sm"
        setValue={setRadiusValue}
        title="sm"
        value={radiusValue}
      />
      <EditableButton
        className="rounded-tl-md"
        setValue={setRadiusValue}
        title="md"
        value={radiusValue}
      />
      <EditableButton
        className="rounded-tl-lg"
        setValue={setRadiusValue}
        title="lg"
        value={radiusValue}
      />
      <EditableButton
        className="rounded-tl-full"
        setValue={setRadiusValue}
        title="full"
        value={radiusValue}
      />
    </ConfigSection>
  );
}
