import type {IndexInput} from "@storybook/types";

export type StorybookIndex = {entries: Record<string, IndexInput & {id: string}>};

declare module "vitest" {
  export interface ProvidedContext {
    __STORYBOOK_INDEX__: StorybookIndex;
  }
}
