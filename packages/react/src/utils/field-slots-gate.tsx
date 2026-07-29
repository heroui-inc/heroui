"use client";

import type {ReactNode} from "react";

import {FieldSlotsGateContext} from "./use-has-text-slot";

/**
 * Opt Description / ErrorMessage into waiting for RAC TextContext slots when
 * nested under a CollectionBuilder root (TagGroup, Select, ComboBox, Autocomplete).
 */
const FieldSlotsGate = ({children}: {children: ReactNode}) => {
  return <FieldSlotsGateContext value>{children}</FieldSlotsGateContext>;
};

export {FieldSlotsGate};
