import {defaultColorsId} from "../../constants";
import {setCssColor} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

import {PaletteRound} from "@/components/icons";

interface DefaultColorsProp {
  config: Config;
  theme: ThemeType;
}

export function DefaultColors({config, theme}: DefaultColorsProp) {
  const {setDefaultColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteRound className="h-5 w-5" />}
      id={defaultColorsId}
      title="Default Colors"
    >
      <ColorPicker
        hexColor={config[theme].defaultColor.default}
        type="default"
        onChange={(hexColor) => setCssColor("default", hexColor, theme)}
        onClose={(hexColor) => setDefaultColor({default: hexColor}, theme, false)}
      />
    </ConfigSection>
  );
}
