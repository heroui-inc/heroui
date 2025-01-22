import {otherColorsId} from "../../constants";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";
import {setCssOtherColor} from "../../css-vars";

import {PaletteIcon} from "@/components/icons";

interface OtherColorsProps {
  config: Config;
  syncThemes: boolean;
  theme: ThemeType;
}

export function LayoutColors({config, syncThemes, theme}: OtherColorsProps) {
  const {setLayoutColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteIcon className="w-4 h-4" />}
      id={otherColorsId}
      title="Layout colors"
    >
      <ColorPicker
        hexColor={config[theme].layoutColor.background}
        type="background"
        onChange={(hexColor) => setCssOtherColor("background", hexColor)}
        onClose={(hexColor) => setLayoutColor({background: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].layoutColor.foreground}
        type="foreground"
        onChange={(hexColor) => setCssOtherColor("foreground", hexColor)}
        onClose={(hexColor) => setLayoutColor({foreground: hexColor}, theme, false)}
      />
      <ColorPicker
        hexColor={config[theme].layoutColor.focus}
        type="focus"
        onChange={(hexColor) => setCssOtherColor("focus", hexColor)}
        onClose={(hexColor) => setLayoutColor({focus: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].layoutColor.overlay}
        type="overlay"
        onChange={(hexColor) => setCssOtherColor("overlay", hexColor)}
        onClose={(hexColor) => setLayoutColor({overlay: hexColor}, theme, false)}
      />
    </ConfigSection>
  );
}
