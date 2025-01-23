import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import FontButton from "./font-button";

import {TextSquare} from "@/components/icons/text-square";

export function Fonts() {
  const {font, setFont} = useThemeBuilder();

  return (
    <ConfigSection icon={<TextSquare className="h-4 w-4" />} title="Fonts">
      <FontButton className="rounded-tl-none" setValue={setFont} title="inter" value={font} />
      <FontButton className="rounded-tl-sm" setValue={setFont} title="roboto" value={font} />
      <FontButton className="rounded-tl-md" setValue={setFont} title="outfit" value={font} />
      <FontButton className="rounded-tl-lg" setValue={setFont} title="lora" value={font} />
    </ConfigSection>
  );
}
