import * as React from "react";
import {render} from "@testing-library/react";
import {HeroUIProvider} from "@heroui/system";

import {DatePicker} from "../src";

describe("DatePicker Label Placement", () => {
  describe("DatePicker with HeroUIProvider context", () => {
    it("should inherit labelPlacement from HeroUIProvider", () => {
      const {container} = render(
        <HeroUIProvider labelPlacement="outside">
          <DatePicker label="Test DatePicker" />
        </HeroUIProvider>,
      );

      const base = container.querySelector("[data-slot=base]") as HTMLElement;
      const label = container.querySelector("span[data-slot=label]") as HTMLElement;
      const inputWrapper = container.querySelector("div[data-slot=input-wrapper]") as HTMLElement;

      expect(base).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(inputWrapper).toBeInTheDocument();

      // In outside placement, label is a direct child of base
      expect(base).toContainElement(label);
      // And inputWrapper is also a direct child of base
      expect(base).toContainElement(inputWrapper);
      // Label should NOT be inside inputWrapper
      expect(inputWrapper).not.toContainElement(label);
    });

    it("should prioritize labelPlacement prop over HeroUIProvider context", () => {
      const {container} = render(
        <HeroUIProvider labelPlacement="outside">
          <DatePicker label="Test DatePicker" labelPlacement="inside" />
        </HeroUIProvider>,
      );

      const base = container.querySelector("[data-slot=base]") as HTMLElement;
      const label = container.querySelector("span[data-slot=label]") as HTMLElement;
      const inputWrapper = container.querySelector("div[data-slot=input-wrapper]") as HTMLElement;

      expect(base).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(inputWrapper).toBeInTheDocument();

      // In inside placement, label is inside inputWrapper
      expect(inputWrapper).toContainElement(label);
    });
  });
});
