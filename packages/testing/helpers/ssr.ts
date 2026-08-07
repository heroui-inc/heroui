import type {ReactElement, ReactNode} from "react";

import {act} from "@testing-library/react";
import {createElement, isValidElement} from "react";
import {hydrateRoot} from "react-dom/client";
import {renderToString} from "react-dom/server";

const HYDRATION_WARNING =
  /Hydration|did not match|Text content does not match|Expected server HTML|Minified React error #(418|419|422|423|425)/i;

export type SsrSmokeOptions = {
  wrapper?: (props: {children: ReactNode}) => ReactNode;
};

const wrap = (ui: ReactElement, wrapper?: SsrSmokeOptions["wrapper"]): ReactElement => {
  if (!wrapper) {
    return ui;
  }

  const wrapped = wrapper({children: ui});

  return isValidElement(wrapped) ? wrapped : createElement("div", null, wrapped);
};

/** `renderToString` → `hydrateRoot`; fails on hydration console errors. */
export const ssrSmoke = async (ui: ReactElement, options: SsrSmokeOptions = {}) => {
  const tree = wrap(ui, options.wrapper);
  const html = renderToString(tree);

  expect(html.length).toBeGreaterThan(0);

  const container = document.createElement("div");

  container.innerHTML = html;
  document.body.appendChild(container);

  const errors: unknown[] = [];
  // eslint-disable-next-line no-console
  const originalError = console.error;

  // eslint-disable-next-line no-console
  console.error = (...args: unknown[]) => {
    errors.push(args);
    originalError(...args);
  };

  try {
    await act(async () => {
      hydrateRoot(container, wrap(ui, options.wrapper));
    });

    const hydrationErrors = errors.filter((entry) => {
      const text = Array.isArray(entry) ? entry.map(String).join(" ") : String(entry);

      return HYDRATION_WARNING.test(text);
    });

    expect(hydrationErrors).toEqual([]);
  } finally {
    // eslint-disable-next-line no-console
    console.error = originalError;
    container.remove();
  }

  return {html};
};
