import {addons, makeDecorator} from "@storybook/preview-api";
import React, {useEffect, useRef} from "react";

import {Emitter, locales} from "../../constant";

const useIsFirstRender = () => {
  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;

    return true;
  }

  return isFirstRenderRef.current;
};

const InternationalizationDecorator = ({children}) => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const channel = addons.getChannel();

    const updateInternationalization = (locale) => {
      document.documentElement.lang = locale.value;
      document.documentElement.dir = locale.direction;
    };

    channel.on(Emitter.INTERNATIONALIZATION, updateInternationalization);

    if (isFirstRender) {
      const preferredLocale = navigator.language;

      const locale = locales.find((l) => l.value === preferredLocale) || locales[0];

      updateInternationalization(locale);
    }

    return () => {
      channel.removeListener(Emitter.INTERNATIONALIZATION, updateInternationalization);
    };
  }, [isFirstRender]);

  return children;
};

export const withInternationalization = makeDecorator({
  name: "withInternationalization",
  parameterName: "internationalization",
  wrapper: (getStory, context) => (
    <InternationalizationDecorator>{getStory(context)}</InternationalizationDecorator>
  ),
});
