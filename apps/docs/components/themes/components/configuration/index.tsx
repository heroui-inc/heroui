import {useEffect, useState, useMemo} from "react";
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
  cn,
} from "@heroui/react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";
import {Icon} from "@iconify/react/dist/offline";
import LinkSquareIcon from "@iconify/icons-solar/link-square-linear";
import {ArrowLeftIcon, ChevronIcon, ChevronUpIcon, CloseIcon} from "@heroui/shared-icons";
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
  const {
    config,
    resetConfig,
    setConfiguration,
    templateTheme,
    setTemplateTheme,
    setRadiusValue,
    setBorderWidthValue,
  } = useThemeBuilder();

  const [lsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templates.filter((t) => t.name === lsConfig.name)[0],
  );
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
  const {theme: currentTheme} = useTheme();

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
      setLsConfig({...config});
    }
  }, [config, theme, prevTheme]);

  useEffect(() => {
    setRadiusValue(templateTheme === "elegant" ? "none" : "md");
    setBorderWidthValue(templateTheme === "elegant" ? "thin" : "medium");
  }, [templateTheme]);

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
    setLsConfig({...config});
  }

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(generatePluginConfig(config), null, 2));
  }

  const DesktopView = useMemo(() => {
    return (
      <Card className="h-auto w-[350px] hidden md:block md:fixed right-3 top-28 z-30 mx-auto m-3">
        <CardHeader className="flex justify-between p-4 pb-3">
          <div className="flex gap-x-4 items-center">
            <div className="text-xl font-medium leading-8 text-default-800 ">Theme</div>
            <Button
              className="text-tiny h-9 bg-default-200 flex items-center"
              size="sm"
              onPress={handleResetTheme}
            >
              Reset
              <RotateLeftLinearIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-9">
            <ThemeSwitch classNames={{wrapper: "dark:!text-default-500"}} />
          </div>
        </CardHeader>
        <Divider className="bg-default-200" />
        <CardBody className="flex flex-col p-4 px-6 h-[60vh] overflow-y-scroll scrollbar-hide">
          <ScrollShadow className="pt-1 pb-6 scrollbar-hide" orientation="vertical">
            <SelectTemplate
              currentTheme={currentTheme}
              name={selectedTemplate?.name ?? templateTheme}
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
              <Fonts />
              <Radiuses />
              <BorderWidths />
              <Scaling />
              <DisableOpacity config={config} />
            </div>
          </ScrollShadow>
        </CardBody>
        <Divider className="bg-default-200" />
        <CardFooter className="flex flex-col h-auto">
          <Button fullWidth className="text-white" color="primary" onPress={handleCopy}>
            Copy Theme
          </Button>
          <div className="text-tiny mt-2 text-default-600">
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
  }, [
    config,
    handleCopy,
    handleResetTheme,
    selectedTemplate,
    syncIcon,
    syncThemes,
    theme,
    templateTheme,
    currentTheme,
  ]);

  const MobileView = useMemo(() => {
    return (
      <div className="md:hidden w-screen fixed bottom-0 right-0 left-0 z-40 dark:bg-[#18181B] bg-[#ffffff] overflow-hidden rounded-t-full shadow-inner">
        <Button
          disableRipple
          isIconOnly
          className="dark:bg-[#18181B] bg-[#d4d4d8] group hover:text-default-600 text-default-400 left-1/2 transform -translate-x-1/2 w-full flex-col h-6"
          onPress={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}
        >
          <ChevronUpIcon
            className="w-6 h-6 dark:text-white/20 text-black/20 group-hover:text-black/80 group-hover:dark:text-white/80"
            strokeWidth={2}
          />
        </Button>
        <Drawer
          hideCloseButton
          isOpen={isDrawerOpen}
          placement="bottom"
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <DrawerContent className="bg-transparent backdrop-blur-xl max-h-[56rem]">
            <div className="p-4 pt-8 flex flex-col gap-y-4">
              <Button
                isIconOnly
                className="group fixed top-1 right-1 dark:bg-white/10 bg-[#d4d4d8] data-[hover=true]:bg-black/30 dark:data-[hover=true]:bg-white/20 z-50 min-w-4 w-4 h-4 rounded-full p-0.5"
                onPress={() => {
                  setIsDrawerOpen(false);
                  setSelectedSection("none");
                }}
              >
                <CloseIcon className="h-3 w-3" />
              </Button>
              {selectedSection === "none" && (
                <div className="flex w-full flex-start overflow-x-scroll scrollbar-hide h-30 gap-x-4">
                  {templates.map((template) => {
                    return (
                      <div key={template.name} className="flex flex-col items-center">
                        <Button
                          className={clsx(
                            "p-0 min-w-0 w-auto h-10 border border-black/5 gap-0 rounded-sm overflow-hidden m-[3px]",
                            templateTheme === template.name
                              ? "outline-1 outline-foreground-800"
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
                            colors={
                              currentTheme === "dark"
                                ? {
                                    background: template.value.dark.layoutColor.background,
                                    ...template.value.dark.baseColor,
                                  }
                                : {
                                    background: template.value.light.layoutColor.background,
                                    ...template.value.light.baseColor,
                                  }
                            }
                            innerClassName="w-2.5"
                          />
                        </Button>
                        <div className="text-tiny text-foreground my-1 font-medium">
                          {template.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="overflow-x-scroll scrollbar-hide">
                <ScrollShadow orientation="vertical">
                  <div className="flex flex-col items-center gap-y-8">
                    {selectedSection === "none" && (
                      <>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-3 gap-y-4 w-full">
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("color");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <Filters className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">Colors</span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("radius");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <Crop className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">Radius</span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("borderWidths");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <CropMinimalistic className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">Border</span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("opacity");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <RadialBlur className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">
                                Opacity
                              </span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("font");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <RadialBlur className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">Font</span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                          <Button
                            className="py-2 px-3 h-auto col-span-2 w-full"
                            onPress={() => {
                              setSelectedSection("scaling");
                            }}
                          >
                            <div className="flex gap-x-2 justity-start items-center px-1.5 pb-0.5 h-9">
                              <ScalingIcon className="h-5 w-5" />
                              <span className="mx-2 w-14 text-sm text-foreground">
                                Scaling
                              </span>{" "}
                            </div>
                            <ChevronIcon className="h-4 w-4 rotate-180" />
                          </Button>
                        </div>
                      </>
                    )}
                    {selectedSection === "color" && (
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Color</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
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
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Radius</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
                          <Radiuses />
                        </div>
                      </div>
                    )}
                    {selectedSection === "borderWidths" && (
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Border Width</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
                          <BorderWidths />
                        </div>
                      </div>
                    )}
                    {selectedSection === "opacity" && (
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Opacity</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
                          <DisableOpacity config={config} />
                        </div>
                      </div>
                    )}
                    {selectedSection === "font" && (
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Font Family</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
                          <Fonts />
                        </div>
                      </div>
                    )}
                    {selectedSection === "scaling" && (
                      <div className="w-full h-auto flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-3">
                          <Button
                            isIconOnly
                            className="text-default-500 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-default-700 min-w-fit w-fit"
                            variant="light"
                            onPress={() => {
                              setSelectedSection("none");
                            }}
                          >
                            <ArrowLeftIcon className="h-5 w-5" strokeWidth={2} />
                          </Button>
                          <div className="text-2xl font-medium">Scaling</div>
                        </div>
                        <div className="flex flex-col gap-y-4 h-auto">
                          <Scaling />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollShadow>
              </div>
            </div>
            <Divider className={cn("my-2 p-0", {hidden: selectedSection != "none"})} />
            <div
              className={cn("flex flex-col items-center px-4 pb-4 gap-y-2", {
                hidden: selectedSection != "none",
              })}
            >
              <Button fullWidth className="text-white bg-blue-500" onPress={handleCopy}>
                Copy Theme
              </Button>
              <div className="text-tiny text-default-500">
                Learn how to setup your theme{" "}
                <Link
                  className="text-default-700 text-tiny underline cursor-pointer"
                  href="/docs/customization/theme"
                >
                  here
                </Link>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }, [
    config,
    handleCopy,
    isDrawerOpen,
    selectedSection,
    syncIcon,
    syncThemes,
    theme,
    templateTheme,
    currentTheme,
  ]);

  return (
    <div id="configuration-container">
      {DesktopView}
      {MobileView}
    </div>
  );
}
