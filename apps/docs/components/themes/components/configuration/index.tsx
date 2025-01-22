import {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  CardFooter,
  Link,
  ScrollShadow,
} from "@heroui/react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";
import {Icon} from "@iconify/react/dist/offline";
import LinkSquareIcon from "@iconify/icons-solar/link-square-linear";

import {useThemeBuilder} from "../../provider";
import {Config, Template, ThemeType} from "../../types";
import {configKey, syncThemesKey, initialConfig} from "../../constants";
import {SelectTemplate} from "../select-template";
import {generatePluginConfig} from "../../utils/config";
import {setAllCssVars} from "../../css-vars";

import {BaseColors} from "./base-colors";
import {ContentColors} from "./content-colors";
import {LayoutColors} from "./layout-colors";
import {FontSizes} from "./font-sizes";
import {LineHeights} from "./line-heights";
import {Radiuses} from "./radiuses";
import {BorderWidths} from "./border-widths";
import {Other} from "./other";
import {DefaultColors} from "./default-colors";

import usePrevious from "@/hooks/use-previous";
import {RotateLeftLinearIcon} from "@/components/icons";
import {ThemeSwitch} from "@/components/theme-switch";

export default function Configuration() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const {config, resetConfig, setConfiguration} = useThemeBuilder();
  const themeProps = useTheme();
  const theme = themeProps.theme as ThemeType;
  const prevTheme = usePrevious(theme);
  const [, setLsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [syncThemes] = useLocalStorage<boolean>(syncThemesKey, true);
  const syncIcon = syncThemes ? <Icon className="flex-shrink-0" icon={LinkSquareIcon} /> : null;

  /**
   * Update the CSS variables and the configuration when the theme changes.
   */
  useEffect(() => {
    // Set the CSS variables when the theme changes
    if (prevTheme !== theme) {
      setAllCssVars(config, theme);
    }

    // Set the configuration in the local storage when the theme changes
    if (prevTheme === theme) {
      setLsConfig(config);
    }
  }, [config, theme, prevTheme]);

  /**
   * Reset the theme to the default one.
   */
  function handleResetTheme() {
    if (selectedTemplate) {
      setConfiguration(selectedTemplate.value, theme, syncThemes);
      setAllCssVars(selectedTemplate.value, theme);
    } else {
      const config = resetConfig(theme, syncThemes);

      setAllCssVars(config, theme);
    }
    setLsConfig(config);
  }

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(generatePluginConfig(config), null, 2));
  }

  return (
    <Card className="max-w-sm h-[70vh] sticky top-28 z-30 mx-auto">
      <CardHeader className="flex justify-between px-6 py-4">
        <div className="flex gap-x-4 items-center">
          <div className="text-xl font-medium text-default-800 ">Theme</div>
          <Button
            className="text-tiny bg-default-100 flex items-center"
            size="sm"
            onPress={handleResetTheme}
          >
            Reset
            <RotateLeftLinearIcon className="h-3 w-3" />
          </Button>
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </CardHeader>
      <Divider className="bg-default-100" />
      <CardBody className="flex flex-col p-4 px-6 h-[60vh] overflow-scroll pb-6">
        <ScrollShadow className="py-1" orientation="vertical">
          <SelectTemplate
            name={selectedTemplate?.name ?? null}
            onChange={(template) => {
              setConfiguration(template.value, theme, syncThemes);
              setAllCssVars(template.value, theme);
              setSelectedTemplate(template);
            }}
          />

          <div className="flex flex-col gap-4 mt-6">
            <DefaultColors config={config} theme={theme} />

            <BaseColors config={config} syncIcon={syncIcon} syncThemes={syncThemes} theme={theme} />

            <ContentColors config={config} theme={theme} />

            <LayoutColors config={config} syncThemes={syncThemes} theme={theme} />

            <FontSizes config={config} />
            <LineHeights config={config} />
            <Radiuses config={config} />
            <BorderWidths config={config} />
            <Other config={config} />
          </div>
        </ScrollShadow>
      </CardBody>
      <Divider className="bg-default-100" />
      <CardFooter className="flex flex-col">
        <Button fullWidth className="text-" color="primary" onPress={handleCopy}>
          Copy Theme
        </Button>
        <div className="text-tiny mt-2 text-default-500">
          Learn how to setup your theme{" "}
          <Link
            className="text-default-800 text-tiny underline cursor-pointer"
            href="/docs/customization/theme"
          >
            here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
