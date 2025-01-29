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
  Drawer,
  DrawerContent,
} from "@heroui/react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";
import {Icon} from "@iconify/react/dist/offline";
import LinkSquareIcon from "@iconify/icons-solar/link-square-linear";
import {ArrowLeftIcon, ChevronIcon, CloseIcon} from "@heroui/shared-icons";
import {clsx} from "@heroui/shared-utils";

import {useThemeBuilder} from "../../provider";
import {Config, Template, ThemeType} from "../../types";
import {configKey, syncThemesKey, initialConfig} from "../../constants";
import {SelectTemplate} from "../select-template";
import {generatePluginConfig} from "../../utils/config";
import {setAllCssVars} from "../../css-vars";
import {templates} from "../../templates";

import {BaseColors} from "./base-colors";
import {ContentColors} from "./content-colors";
import {LayoutColors} from "./layout-colors";
import {Radiuses} from "./radiuses";
import {DefaultColors} from "./default-colors";
import {DisableOpacity} from "./disable-opacity";
import Swatch from "./swatch";
import {Fonts} from "./fonts";
import {Scaling} from "./scaling";
import {BorderWidths} from "./border-widths";

import usePrevious from "@/hooks/use-previous";
import {Filters, RotateLeftLinearIcon} from "@/components/icons";
import {ThemeSwitch} from "@/components/theme-switch";
import {Crop, CropMinimalistic} from "@/components/icons/crop";
import {RadialBlur} from "@/components/icons/radial-blur";
import {Scaling as ScalingIcon} from "@/components/icons/scaling";

export default function Configuration() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const {config, resetConfig, setConfiguration, templateTheme, setTemplateTheme} =
    useThemeBuilder();
  const themeProps = useTheme();
  const theme = themeProps.theme as ThemeType;
  const prevTheme = usePrevious(theme);
  const [, setLsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [syncThemes] = useLocalStorage<boolean>(syncThemesKey, true);
  const syncIcon = syncThemes ? <Icon className="flex-shrink-0" icon={LinkSquareIcon} /> : null;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<
    "none" | "color" | "radius" | "font" | "opacity" | "scaling" | "borderWidths"
  >("none");

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
    <>
      <Card className="h-auto w-[35vw] lg:w-[23vw] hidden md:block md:fixed right-3 top-28 z-30 mx-auto m-3">
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
        <CardBody className="flex flex-col p-4 px-6 h-[50vh] overflow-y-scroll pb-6 scrollbar-hide">
          <ScrollShadow className="py-1 scrollbar-hide" orientation="vertical">
            <SelectTemplate
              name={selectedTemplate?.name ?? null}
              onChange={(template) => {
                setConfiguration(template.value, theme, syncThemes);
                setAllCssVars(template.value, theme);
                setSelectedTemplate(template);
                setTemplateTheme(template.name);
              }}
            />

            <div className="flex flex-col gap-6 mt-6">
              <DefaultColors config={config} theme={theme} />
              <BaseColors
                config={config}
                syncIcon={syncIcon}
                syncThemes={syncThemes}
                theme={theme}
              />
              <ContentColors config={config} theme={theme} />
              <LayoutColors config={config} syncThemes={syncThemes} theme={theme} />
              <Radiuses />
              <BorderWidths />
              <Fonts />
              <DisableOpacity config={config} />
              <Scaling />
            </div>
          </ScrollShadow>
        </CardBody>
        <Divider className="bg-default-100" />
        <CardFooter className="flex flex-col h-auto">
          <Button fullWidth className="text-white" color="primary" onPress={handleCopy}>
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
      <div className="md:hidden w-screen fixed bottom-0 right-0 left-0 z-40 bg-default-100 overflow-hidden rounded-t-full shadow-inner">
        <Button
          disableRipple
          isIconOnly
          className="bg-default-100 group hover:text-default-600 text-default-400 left-1/2 transform -translate-x-1/2 w-full h-6 flex-col pb-2"
          onPress={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}
        >
          <div className="h-0.5 w-10 bg-default-400 rounded-full cursor-pointer group-hover:bg-default-500" />
          <div className="h-0.5 w-10 bg-default-400 rounded-full cursor-pointer mt-0.5 group-hover:bg-default-500" />
          <div className="h-1 w-10 bg-default-400 rounded-full cursor-pointer mt-0.5 group-hover:bg-default-500" />
        </Button>
        <Drawer
          hideCloseButton
          isOpen={isDrawerOpen}
          placement="bottom"
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <DrawerContent className="backdrop-blur-2xl">
            <Button
              isIconOnly
              className="group fixed top-0 right-0 bg-default-100 hover:bg-default-200 z-50 min-w-8 w-8 h-8 rounded-full m-1"
              onPress={() => {
                setIsDrawerOpen(false);
                setSelectedSection("none");
              }}
            >
              <CloseIcon className="h-4 w-4" />
            </Button>
            <div className="overflow-x-scroll scrollbar-hide p-2 px-8 pt-12">
              <ScrollShadow orientation="vertical">
                <div className="flex flex-col items-center gap-y-8">
                  {selectedSection === "none" && (
                    <>
                      <div className="flex w-full flex-start overflow-x-scroll scrollbar-hide py-2 h-auto">
                        {templates.map((template) => {
                          return (
                            <div key={template.name} className="flex flex-col items-center px-2">
                              <Button
                                className={clsx(
                                  "p-0 min-w-0 w-auto h-12 rounded-md gap-0",
                                  templateTheme === template.name
                                    ? "outline-2 outline-foreground-800"
                                    : "",
                                )}
                                onPress={() => {
                                  setConfiguration(template.value, theme, syncThemes);
                                  setAllCssVars(template.value, theme);
                                  setSelectedTemplate(template);
                                  setTemplateTheme(template.name);
                                }}
                              >
                                <Swatch
                                  className="h-full"
                                  colors={template.value.light.baseColor}
                                  innerClassName="w-4"
                                />
                              </Button>
                              <div className="text-sm text-default-500 my-1">{template.name}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-full flex gap-4 flex-wrap items-center justify-around">
                        <Button
                          className="w-[40vw] h-16 flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("color");
                          }}
                        >
                          <Filters className="h-5 w-5" />
                          <span className="mx-2 w-16 text-base">Colors</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="w-[40vw] h-16 flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("radius");
                          }}
                        >
                          <Crop className="h-5 w-5" />
                          <span className="mx-2 w-16 text-base">Radius</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="w-[40vw] h-16 text-lg flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("borderWidths");
                          }}
                        >
                          <CropMinimalistic className="h-5 w-5" />
                          <span className="mx-2 w-16 text-base">Border</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="w-[40vw] h-16 text-lg flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("opacity");
                          }}
                        >
                          <RadialBlur className="h-5 w-5" />
                          <span className="mx-2 w-16 text-base">Opacity</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="w-[40vw] h-16 text-lg flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("font");
                          }}
                        >
                          <RadialBlur className="h-5 w-5" />
                          <span className="mx-2 w-16 text-base">Font</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                        <Button
                          className="w-[40vw] h-16 text-lg flex items-center gap-x-3"
                          onPress={() => {
                            setSelectedSection("scaling");
                          }}
                        >
                          <ScalingIcon className="h-6 w-6" />
                          <span className="mx-2 w-20 text-base">Scaling</span>{" "}
                          <ChevronIcon className="h-5 w-5 rotate-180" />
                        </Button>
                      </div>
                    </>
                  )}
                  {selectedSection === "color" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <div className="flex flex-col gap-y-4">
                        <DefaultColors config={config} theme={theme} />
                        <BaseColors
                          config={config}
                          syncIcon={syncIcon}
                          syncThemes={syncThemes}
                          theme={theme}
                        />
                        <ContentColors config={config} theme={theme} />
                        <LayoutColors config={config} syncThemes={syncThemes} theme={theme} />
                      </div>
                    </div>
                  )}
                  {selectedSection === "radius" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <Radiuses />
                    </div>
                  )}
                  {selectedSection === "borderWidths" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <BorderWidths />
                    </div>
                  )}
                  {selectedSection === "font" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <Fonts />
                    </div>
                  )}
                  {selectedSection === "opacity" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <DisableOpacity config={config} />
                    </div>
                  )}
                  {selectedSection === "scaling" && (
                    <div className="w-full h-full">
                      <Button
                        isIconOnly
                        className="absolute left-3 top-1 text-default-400 hover:text-default-600 cursor-pointer"
                        variant="light"
                        onPress={() => {
                          setSelectedSection("none");
                        }}
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </Button>
                      <Scaling />
                    </div>
                  )}
                </div>
              </ScrollShadow>
            </div>
            <Divider className="my-2 p-0" />
            <div className="flex flex-col items-center px-8">
              <Button fullWidth className="text-white" color="primary" onPress={handleCopy}>
                Copy Theme
              </Button>
              <div className="text-tiny mt-2 text-background-500">
                Learn how to setup your theme{" "}
                <Link
                  className="text-background-800 text-tiny underline cursor-pointer"
                  href="/docs/customization/theme"
                >
                  here
                </Link>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
