import {colorsId} from "../../constants";
import {setCssColor} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

import {Filters} from "@/components/icons";

interface BrandColorsProps {
  config: Config;
  syncIcon: React.ReactNode;
  syncThemes: boolean;
  theme: ThemeType;
}

export function BaseColors({config, syncThemes, theme}: BrandColorsProps) {
  const {setBaseColor} = useThemeBuilder();

  return (
    <ConfigSection
      icon={<Filters className="h-5 w-5" />}
      id={colorsId}
      title="Base colors"
      toolTip="Primary, Secondary, Success, Warning, Danger colors"
    >
      <ColorPicker
        hexColor={config[theme].baseColor.primary}
        type="primary"
        onChange={(hexColor) => setCssColor("primary", hexColor, theme)}
        onClose={(hexColor) => setBaseColor({primary: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].baseColor.secondary}
        type="secondary"
        onChange={(hexColor) => setCssColor("secondary", hexColor, theme)}
        onClose={(hexColor) => setBaseColor({secondary: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].baseColor.success}
        type="success"
        onChange={(hexColor) => setCssColor("success", hexColor, theme)}
        onClose={(hexColor) => setBaseColor({success: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].baseColor.warning}
        type="warning"
        onChange={(hexColor) => setCssColor("warning", hexColor, theme)}
        onClose={(hexColor) => setBaseColor({warning: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].baseColor.danger}
        type="danger"
        onChange={(hexColor) => setCssColor("danger", hexColor, theme)}
        onClose={(hexColor) => setBaseColor({danger: hexColor}, theme, syncThemes)}
      />
    </ConfigSection>
  );
}
