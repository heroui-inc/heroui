import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses, groupDataFocusVisibleClasses} from "../utils";

/**
 * NumberInput wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, label, inputWrapper, input, clearButton, description, errorMessage} = numberInput({...})
 *
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={inputWrapper()}>
 *    <input className={input()}/>
 *    <button className={clearButton()}>Clear</button>
 *  </div>
 *  <span className={description()}>Description</span>
 *  <span className={errorMessage()}>Invalid input</span>
 * </div>
 * ```
 */
const numberInput = tv({
  slots: {
    base: "group flex flex-col data-[hidden=true]:hidden",
    label: [
      "absolute",
      "z-10",
      "pointer-events-none",
      "origin-top-left",
      "flex-shrink-0",
      // Using RTL here as Tailwind CSS doesn't support `start` and `end` logical properties for transforms yet.
      "rtl:origin-top-right",
      "subpixel-antialiased",
      "block",
      "text-small",
      "text-foreground-500",
    ],
    mainWrapper: "h-full",
    inputWrapper:
      "relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3",
    innerWrapper: "inline-flex w-full items-center h-full box-border",
    input: [
      "w-full font-normal bg-transparent !outline-solid outline-transparent placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent",
      "data-[has-start-content=true]:ps-1.5",
      "data-[has-end-content=true]:pe-1.5",
      "autofill:bg-transparent bg-clip-text",
    ],
    clearButton: [
      "p-2",
      "-m-2",
      "z-10",
      "end-3",
      "start-auto",
      "pointer-events-none",
      "appearance-none",
      "outline-solid outline-transparent",
      "select-none",
      "opacity-0",
      "hover:!opacity-100",
      "cursor-pointer",
      "active:!opacity-70",
      "rounded-full",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    stepperButton: [
      "bg-transparent",
      "flex",
      "justify-center",
      "items-center",
      "before:absolute",
      "before:w-8", // the max width that won't block clear button
      "before:h-8",
      "before:rounded-full",
      "after:shadow-small",
      "after:bg-background",
      "data-[focused=true]:z-10",
      "min-w-5",
      "w-5",
      "h-5",
      "overflow-visible",
      "transition-opacity",
      "data-[hover=true]:opacity-70",
      "data-[pressed=true]:opacity-disabled",
    ],
    stepperWrapper: ["flex", "flex-col", "ps-1", "h-full", "justify-center"],
    helperWrapper: "hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100",
        ],
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400 focus-within:border-default-400",
        ],
        value: "group-data-[has-value=true]:text-default-foreground",
      },
      bordered: {
        inputWrapper: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "group-data-[focus=true]:border-default-foreground",
        ],
      },
      underlined: {
        inputWrapper: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "group-data-[focus=true]:after:w-full",
        ],
        innerWrapper: "pb-1",
        label: "group-data-[filled-within=true]:text-foreground",
      },
    },
    color: {
      default: {},
      primary: {
        stepperButton: "text-primary",
      },
      secondary: {
        stepperButton: "text-secondary",
      },
      success: {
        stepperButton: "text-success",
      },
      warning: {
        stepperButton: "text-warning",
      },
      danger: {
        stepperButton: "text-danger",
      },
    },
    size: {
      sm: {
        label: "text-tiny",
        inputWrapper: "h-8 min-h-8 px-2 rounded-small",
        input: "text-small",
        clearButton: "text-medium",
      },
      md: {
        inputWrapper: "h-10 min-h-10 rounded-medium",
        input: "text-small",
        clearButton: "text-large",
      },
      lg: {
        label: "text-medium",
        inputWrapper: "h-12 min-h-12 rounded-large",
        input: "text-medium",
        clearButton: "text-large",
      },
    },
    radius: {
      none: {
        inputWrapper: "rounded-none",
      },
      sm: {
        inputWrapper: "rounded-small",
      },
      md: {
        inputWrapper: "rounded-medium",
      },
      lg: {
        inputWrapper: "rounded-large",
      },
      full: {
        inputWrapper: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        mainWrapper: "flex flex-col",
        stepperButton: "min-w-3 w-3 h-3",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:items-start",
        inputWrapper: "flex-1",
        mainWrapper: "flex flex-col",
        label: "relative text-foreground pe-2 ps-2 pointer-events-auto",
        stepperButton: "min-w-3 w-3 h-3",
      },
      inside: {
        label: "cursor-text",
        inputWrapper: "flex-col items-start justify-center gap-0",
        innerWrapper: "group-data-[has-label=true]:items-end",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
      false: {},
    },
    isClearable: {
      true: {
        input: "peer pe-6 input-search-cancel-button-none",
        clearButton: [
          "peer-data-[filled=true]:pointer-events-auto",
          "peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block",
          "peer-data-[filled=true]:scale-100",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        inputWrapper: "pointer-events-none",
        label: "pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        input: "!placeholder:text-danger !text-danger",
      },
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ms-0.5",
      },
    },
    disableAnimation: {
      true: {
        input: "transition-none",
        inputWrapper: "transition-none",
        label: "transition-none",
      },
      false: {
        inputWrapper: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "!duration-200",
          "!ease-out",
          "motion-reduce:transition-none",
          "transition-[transform,color,left,opacity,translate,scale]",
        ],
        clearButton: [
          "scale-90",
          "ease-out",
          "duration-150",
          "transition-[opacity,transform]",
          "motion-reduce:transition-none",
          "motion-reduce:scale-100",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    labelPlacement: "inside",
    isDisabled: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "default",
      class: {
        input: "group-data-[has-value=true]:text-default-foreground",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        inputWrapper: [
          "bg-primary-100",
          "data-[hover=true]:bg-primary-50",
          "text-primary",
          "group-data-[focus=true]:bg-primary-50",
          "placeholder:text-primary",
        ],
        input: "placeholder:text-primary",
        label: "text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        inputWrapper: [
          "bg-secondary-100",
          "text-secondary",
          "data-[hover=true]:bg-secondary-50",
          "group-data-[focus=true]:bg-secondary-50",
          "placeholder:text-secondary",
        ],
        input: "placeholder:text-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        inputWrapper: [
          "bg-success-100",
          "text-success-600",
          "dark:text-success",
          "placeholder:text-success-600",
          "dark:placeholder:text-success",
          "data-[hover=true]:bg-success-50",
          "group-data-[focus=true]:bg-success-50",
        ],
        input: "placeholder:text-success-600 dark:placeholder:text-success",
        label: "text-success-600 dark:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        inputWrapper: [
          "bg-warning-100",
          "text-warning-600",
          "dark:text-warning",
          "placeholder:text-warning-600",
          "dark:placeholder:text-warning",
          "data-[hover=true]:bg-warning-50",
          "group-data-[focus=true]:bg-warning-50",
        ],
        input: "placeholder:text-warning-600 dark:placeholder:text-warning",
        label: "text-warning-600 dark:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        inputWrapper: [
          "bg-danger-100",
          "text-danger",
          "dark:text-danger-500",
          "placeholder:text-danger",
          "dark:placeholder:text-danger-500",
          "data-[hover=true]:bg-danger-50",
          "group-data-[focus=true]:bg-danger-50",
        ],
        input: "placeholder:text-danger dark:placeholder:text-danger-500",
        label: "text-danger dark:text-danger-500",
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "primary",
      class: {
        label: "text-primary",
        inputWrapper: "data-[hover=true]:border-primary focus-within:border-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        label: "text-secondary",
        inputWrapper: "data-[hover=true]:border-secondary focus-within:border-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        label: "text-success",
        inputWrapper: "data-[hover=true]:border-success focus-within:border-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        label: "text-warning",
        inputWrapper: "data-[hover=true]:border-warning focus-within:border-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        label: "text-danger",
        inputWrapper: "data-[hover=true]:border-danger focus-within:border-danger",
      },
    },
    // underlined & color
    {
      variant: "underlined",
      color: "default",
      class: {
        input: "group-data-[has-value=true]:text-foreground",
      },
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        inputWrapper: "after:bg-primary",
        label: "text-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        inputWrapper: "after:bg-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        inputWrapper: "after:bg-success",
        label: "text-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        inputWrapper: "after:bg-warning",
        label: "text-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        inputWrapper: "after:bg-danger",
        label: "text-danger",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "primary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-primary",
        label: "text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        inputWrapper: "group-data-[focus=true]:border-success",
        label: "text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        inputWrapper: "group-data-[focus=true]:border-warning",
        label: "text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        inputWrapper: "group-data-[focus=true]:border-danger",
        label: "text-danger",
      },
    },
    // labelPlacement=inside & default
    {
      labelPlacement: "inside",
      color: "default",
      class: {
        label: "group-data-[filled-within=true]:text-default-600",
      },
    },
    // labelPlacement=outside & default
    {
      labelPlacement: "outside",
      color: "default",
      class: {
        label: "group-data-[filled-within=true]:text-foreground",
      },
    },
    // radius-full & size
    {
      radius: "full",
      size: ["sm"],
      class: {
        inputWrapper: "px-3",
      },
    },
    {
      radius: "full",
      size: "md",
      class: {
        inputWrapper: "px-4",
      },
    },
    {
      radius: "full",
      size: "lg",
      class: {
        inputWrapper: "px-5",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        inputWrapper: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        inputWrapper: "after:transition-width motion-reduce:after:transition-none",
      },
    },
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        inputWrapper: [
          // focus ring
          ...groupDataFocusVisibleClasses,
        ],
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: "flat",
      class: {
        inputWrapper: [
          "!bg-danger-50",
          "data-[hover=true]:!bg-danger-100",
          "group-data-[focus=true]:!bg-danger-50",
        ],
      },
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        inputWrapper: "!border-danger group-data-[focus=true]:!border-danger",
      },
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        inputWrapper: "after:!bg-danger",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        inputWrapper: "h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        inputWrapper: "h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        inputWrapper: "h-16 py-2.5 gap-0",
      },
    },
    // size & labelPlacement & variant=[faded, bordered]
    {
      labelPlacement: "inside",
      size: "sm",
      variant: ["bordered", "faded"],
      class: {
        inputWrapper: "py-1",
      },
    },
    // labelPlacement=[inside,outside]
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["group-data-[filled-within=true]:pointer-events-auto"],
      },
    },
    // labelPlacement=[outside]
    {
      labelPlacement: "outside",
      class: {
        base: "relative justify-end",
        label: [
          "pb-0",
          "z-20",
          "top-1/2",
          "-translate-y-1/2",
          "group-data-[filled-within=true]:start-0",
        ],
      },
    },
    // labelPlacement=[inside]
    {
      labelPlacement: ["inside"],
      class: {
        label: ["group-data-[filled-within=true]:scale-85"],
      },
    },
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-tiny)/2_-_8px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_8px)]",
        ],
      },
    },
    // labelPlacement=[inside] & variant=flat
    {
      labelPlacement: ["inside"],
      variant: "flat",
      class: {
        innerWrapper: "pb-0.5",
      },
    },
    // variant=underlined & size
    {
      variant: "underlined",
      size: "sm",
      class: {
        innerWrapper: "pb-1",
      },
    },
    {
      variant: "underlined",
      size: ["md", "lg"],
      class: {
        innerWrapper: "pb-1.5",
      },
    },
    // inside & size
    {
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: "text-small",
        stepperButton: "before:h-6",
      },
    },
    // inside & size & [faded, bordered]
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-tiny)/2_-_8px_-_var(--heroui-border-width-medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px_-_var(--heroui-border-width-medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_8px_-_var(--heroui-border-width-medium))]",
        ],
      },
    },
    // inside & size & underlined
    {
      labelPlacement: "inside",
      variant: "underlined",
      size: "sm",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-tiny)/2_-_5px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      size: "md",
      class: {
        label: [
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_3.5px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_4px)]",
        ],
      },
    },
    // outside & size
    {
      labelPlacement: "outside",
      size: "sm",
      class: {
        label: [
          "start-2",
          "text-tiny",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_var(--heroui-font-size-tiny)/2_+_16px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(var(--heroui-font-size-small)_+_8px)]",
        stepperButton: "before:h-4",
      },
    },
    {
      labelPlacement: "outside",
      size: "md",
      class: {
        label: [
          "start-3",
          "end-auto",
          "text-small",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_var(--heroui-font-size-small)/2_+_20px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(var(--heroui-font-size-small)_+_10px)]",
      },
    },
    {
      labelPlacement: "outside",
      size: "lg",
      class: {
        label: [
          "start-3",
          "end-auto",
          "text-medium",
          "group-data-[filled-within=true]:-translate-y-[calc(100%_+_var(--heroui-font-size-small)/2_+_24px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(var(--heroui-font-size-small)_+_12px)]",
        stepperButton: "min-4 w-4 h-4 before:h-6",
      },
    },
    // outside-left & size & hasHelper
    {
      labelPlacement: "outside-left",
      size: "sm",
      class: {
        label: "group-data-[has-helper=true]:pt-2",
        stepperButton: "before:h-4",
      },
    },
    {
      labelPlacement: "outside-left",
      size: "md",
      class: {
        label: "group-data-[has-helper=true]:pt-3",
        stepperButton: "before:h-4",
      },
    },
    {
      labelPlacement: "outside-left",
      size: "lg",
      class: {
        label: "group-data-[has-helper=true]:pt-4",
        stepperButton: "min-4 w-4 h-4 before:h-6",
      },
    },
    // text truncate labelPlacement=[inside,outside]
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["pe-2", "max-w-full", "text-ellipsis", "overflow-hidden"],
      },
    },
  ],
});

export type NumberInputVariantProps = VariantProps<typeof numberInput>;
export type NumberInputSlots = keyof ReturnType<typeof numberInput>;

export {numberInput};
