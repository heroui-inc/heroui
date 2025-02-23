import {forwardRef} from "@heroui/system-rsc";

import {UseSpinnerProps, useSpinner} from "./use-spinner";

export interface SpinnerProps extends UseSpinnerProps {}

const Spinner = forwardRef<"div", SpinnerProps>((props, ref) => {
  const {slots, classNames, label, variant, getSpinnerProps} = useSpinner({...props});

  if (variant === "wave" || variant === "dots") {
    return (
      <div ref={ref} {...getSpinnerProps()}>
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          {[...new Array(3)].map((_, index) => (
            <i
              key={`dot-${index}`}
              className={slots.dots({class: classNames?.dots})}
              style={
                {
                  "--dot-index": index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div ref={ref} {...getSpinnerProps()}>
        <svg
          className={slots.wrapper({class: classNames?.wrapper})}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className={slots.circle1({class: classNames?.circle1})}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={slots.circle2({class: classNames?.circle2})}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
        {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div ref={ref} {...getSpinnerProps()}>
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          {[...new Array(12)].map((_, index) => (
            <i
              key={`star-${index}`}
              className={slots.spinnerBars({class: classNames?.spinnerBars})}
              style={
                {
                  "--bar-index": index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
      </div>
    );
  }

  return (
    <div ref={ref} {...getSpinnerProps()}>
      <div className={slots.wrapper({class: classNames?.wrapper})}>
        <i className={slots.circle1({class: classNames?.circle1})} />
        <i className={slots.circle2({class: classNames?.circle2})} />
      </div>
      {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
    </div>
  );
});

Spinner.displayName = "HeroUI.Spinner";

export default Spinner;
