import {forwardRef} from "@nextui-org/system";
import {FreeSoloPopover} from "@nextui-org/popover";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "@nextui-org/shared-icons";
import {Listbox} from "@nextui-org/listbox";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import React, {ForwardedRef, ReactElement, Ref} from "react";
import {AnimatePresence} from "framer-motion";
import {Chip} from "@nextui-org/chip";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";

interface Props<T> extends UseAutocompleteProps<T> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLInputElement>) {
  const {
    Component,
    state,
    isOpen,
    disableAnimation,
    selectorIcon = <ChevronDownIcon />,
    clearIcon = <CloseIcon />,
    getBaseProps,
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  } = useAutocomplete<T>({...props, ref});

  const popoverContent = isOpen ? (
    <FreeSoloPopover {...getPopoverProps()} state={state}>
      <ScrollShadow {...getListBoxWrapperProps()}>
        <Listbox {...getListBoxProps()} />
      </ScrollShadow>
    </FreeSoloPopover>
  ) : null;

  const multipleTagListContent =
    props.selectionMode === "multiple" ? (
      <React.Fragment>
        {Array.from(state.selectedKeys).map((key) => (
          <Chip
            key={key}
            onClose={() => {
              const cloneSet = new Set(state.selectedKeys);

              cloneSet.delete(key);

              return state.setSelectedKeys(cloneSet);
            }}
          >
            {key}
          </Chip>
        ))}
      </React.Fragment>
    ) : null;

  return (
    <Component {...getBaseProps()}>
      <Input
        {...getInputProps()}
        endContent={
          <div {...getEndContentWrapperProps()}>
            <Button {...getClearButtonProps()}>{clearIcon}</Button>
            <Button {...getSelectorButtonProps()}>{selectorIcon}</Button>
          </div>
        }
        startContent={props.selectionMode === "multiple" ? multipleTagListContent : null}
      />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </Component>
  );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete) as <T = object>(
  props: AutocompleteProps<T>,
) => ReactElement;

Autocomplete.displayName = "NextUI.Autocomplete";
