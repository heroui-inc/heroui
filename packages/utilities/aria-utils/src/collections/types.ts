import type {CollectionBase} from "@react-types/shared";
import type {ReactElement, ReactNode} from "react";
import type {PartialNode} from "@react-stately/collections";

export interface CollectionProps<T> extends Omit<CollectionBase<T>, "children" | "items"> {
  items?: T[];
  /** The contents of the collection. */
  children?: ReactNode | ((item: T) => ReactElement);
}

export type {PartialNode};
