"use client";

import type {FieldsetVariants} from "./fieldset.styles";

import {Slot} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {fieldsetVariants} from "./fieldset.styles";

/* -------------------------------------------------------------------------------------------------
 * Fieldset
 * -----------------------------------------------------------------------------------------------*/

const FieldsetContext = createContext<{slots?: ReturnType<typeof fieldsetVariants>}>({});

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement>, FieldsetVariants {
  ref?: React.Ref<HTMLFieldSetElement>;
  asChild?: boolean;
}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : "fieldset";

    const slots = React.useMemo(() => fieldsetVariants({}), []);

    return (
      <FieldsetContext.Provider value={{slots}}>
        <Comp ref={ref} className={slots?.base({className})} data-slot="fieldset" {...props} />
      </FieldsetContext.Provider>
    );
  },
);

Fieldset.displayName = "HeroUI.Fieldset";

/* -----------------------------------------------------------------------------------------------*/

interface FieldsetLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  ref?: React.Ref<HTMLLegendElement>;
  asChild?: boolean;
}

const FieldsetLegend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : "legend";

    const {slots} = useContext(FieldsetContext);

    return (
      <Comp
        ref={ref}
        className={slots?.legend({className})}
        data-slot="fieldset-legend"
        {...props}
      />
    );
  },
);

FieldsetLegend.displayName = "HeroUI.FieldsetLegend";

/* -----------------------------------------------------------------------------------------------*/

interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  asChild?: boolean;
}

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({asChild = false, className, ...rest}, ref) => {
    const Comp = asChild ? Slot : "div";

    const {slots} = useContext(FieldsetContext);

    return (
      <Comp
        ref={ref}
        className={slots?.fieldGroup({className})}
        data-slot="fieldset-field-group"
        {...rest}
      />
    );
  },
);

FieldGroup.displayName = "HeroUI.FieldGroup";

/* -----------------------------------------------------------------------------------------------*/

interface FieldsetActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const FieldsetActions = React.forwardRef<HTMLDivElement, FieldsetActionsProps>(
  ({asChild, children, className, ...rest}, ref) => {
    const Component = asChild ? Slot : "div";
    const {slots} = useContext(FieldsetContext);

    return (
      <Component
        ref={ref}
        className={slots?.actions({className})}
        data-slot="fieldset-actions"
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

FieldsetActions.displayName = "HeroUI.FieldsetActions";

/* -----------------------------------------------------------------------------------------------*/

export {Fieldset, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
