import type {Variants} from "framer-motion";

import {forwardRef} from "@heroui/system";
import {useMemo, ReactNode, useRef, useEffect} from "react";
import {ChevronIcon} from "@heroui/shared-icons";
import {AnimatePresence, LazyMotion, m, useWillChange} from "framer-motion";
import {TRANSITION_VARIANTS} from "@heroui/framer-utils";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends UseAccordionItemProps {}

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

const AccordionItem = forwardRef<"button", AccordionItemProps>((props, ref) => {
  const {
    Component,
    HeadingComponent,
    classNames,
    slots,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    scrollOnOpen,
    transitionDuration,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps,
  } = useAccordionItem({...props, ref});

  const willChange = useWillChange();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to content when opened
  useEffect(() => {
    if (isOpen && scrollOnOpen && contentRef.current) {
      const content = contentRef.current;

      // Wait for animation to start
      setTimeout(() => {
        content.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 50);
    }
  }, [isOpen, scrollOnOpen]);

  const indicatorContent = useMemo<ReactNode>(() => {
    if (typeof indicator === "function") {
      return indicator({indicator: <ChevronIcon />, isOpen, isDisabled});
    }

    if (indicator) return indicator;

    return null;
  }, [indicator, isOpen, isDisabled]);

  const indicatorComponent = indicatorContent || <ChevronIcon />;

  const content = useMemo(() => {
    if (disableAnimation) {
      return (
        <div ref={contentRef} {...getContentProps()}>
          {children}
        </div>
      );
    }

    const transitionVariants: Variants = {
      exit: {
        ...TRANSITION_VARIANTS.collapse.exit,
        overflowY: "hidden",
        transition: {duration: transitionDuration ? transitionDuration / 1000 : 0.3},
      },
      enter: {
        ...TRANSITION_VARIANTS.collapse.enter,
        overflowY: "unset",
        transition: {duration: transitionDuration ? transitionDuration / 1000 : 0.3},
      },
    };

    return keepContentMounted ? (
      <LazyMotion features={domAnimation}>
        <m.section
          key="accordion-content"
          animate={isOpen ? "enter" : "exit"}
          exit="exit"
          initial="exit"
          style={{willChange}}
          variants={transitionVariants}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          {...motionProps}
        >
          <div ref={contentRef} {...getContentProps()}>
            {children}
          </div>
        </m.section>
      </LazyMotion>
    ) : (
      <AnimatePresence initial={false}>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.section
              key="accordion-content"
              animate="enter"
              exit="exit"
              initial="exit"
              style={{willChange}}
              variants={transitionVariants}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              {...motionProps}
            >
              <div ref={contentRef} {...getContentProps()}>
                {children}
              </div>
            </m.section>
          </LazyMotion>
        )}
      </AnimatePresence>
    );
  }, [isOpen, disableAnimation, keepContentMounted, children, motionProps, transitionDuration]);

  return (
    <Component {...getBaseProps()}>
      <HeadingComponent {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {startContent && (
            <div className={slots.startContent({class: classNames?.startContent})}>
              {startContent}
            </div>
          )}
          <div className={slots.titleWrapper({class: classNames?.titleWrapper})}>
            {title && <span {...getTitleProps()}>{title}</span>}
            {subtitle && <span {...getSubtitleProps()}>{subtitle}</span>}
          </div>
          {!hideIndicator && indicatorComponent && (
            <span {...getIndicatorProps()}>{indicatorComponent}</span>
          )}
        </button>
      </HeadingComponent>
      {content}
    </Component>
  );
});

AccordionItem.displayName = "HeroUI.AccordionItem";

export default AccordionItem;
