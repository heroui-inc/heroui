import {Form} from "@storybook/components";
import {addons, types} from "@storybook/manager-api";
import React, {useMemo, useState} from "react";

import {Emitter, locales} from "../../constant";

const InternationalizationTool = () => {
  const [selectedLocale, setSelectedLocale] = useState(navigator.language || "Auto");

  const onChangeHandler = (locale: string) => {
    const selected = locales.find((l) => l.value === locale) || locales[0];

    setSelectedLocale(selected.value);

    addons.getChannel().emit(Emitter.INTERNATIONALIZATION, selected);
  };

  const sortedLocales = useMemo(() => {
    return locales.sort((a, b) =>
      a.value === "Auto" ? -1 : b.value === "Auto" ? 1 : a.label.localeCompare(b.label),
    );
  }, []);

  return (
    <Form.Select value={selectedLocale} onChange={(event) => onChangeHandler(event.target.value)}>
      {sortedLocales.map((locale) => (
        <option key={locale.value} value={locale.value}>
          {locale.label}
        </option>
      ))}
    </Form.Select>
  );
};

addons.register("InternationalizationTool", () => {
  addons.add("InternationalizationTool", {
    match: ({viewMode}) => !!viewMode?.match(/^(story|docs)$/),
    render: () => <InternationalizationTool />,
    title: "Internationalization",
    type: types.TOOL,
  });
});
