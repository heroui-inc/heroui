import {baseColorsId} from "../../constants";
import {setCssContentColor} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

import {PaletteRound} from "@/components/icons";

interface BaseColorsProps {
  config: Config;
  theme: ThemeType;
}

export function ContentColors({config, theme}: BaseColorsProps) {
  const {setContentColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<PaletteRound className="w-5 h-5" />}
      id={baseColorsId}
      title="Content colors"
      toolTip="content1, content2, content3, content4 colors"
    >
      <ColorPicker
        hexColor={config[theme].contentColor.content1}
        type="content1"
        onChange={(hexColor) => setCssContentColor(1, hexColor)}
        onClose={(hexColor) => setContentColor({content1: hexColor}, theme)}
      />
      <ColorPicker
        hexColor={config[theme].contentColor.content2}
        type="content2"
        onChange={(hexColor) => setCssContentColor(2, hexColor)}
        onClose={(hexColor) => setContentColor({content2: hexColor}, theme)}
      />
      <ColorPicker
        hexColor={config[theme].contentColor.content3}
        type="content3"
        onChange={(hexColor) => setCssContentColor(3, hexColor)}
        onClose={(hexColor) => setContentColor({content3: hexColor}, theme)}
      />
      <ColorPicker
        hexColor={config[theme].contentColor.content4}
        type="content4"
        onChange={(hexColor) => setCssContentColor(4, hexColor)}
        onClose={(hexColor) => setContentColor({content4: hexColor}, theme)}
      />
    </ConfigSection>
  );
}
