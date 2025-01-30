import transition from "./transition";
import custom from "./custom";
import scrollbarHide from "./scrollbar-hide";
import text from "./text";

export const utilities = {
  ...custom,
  ...transition,
  ...scrollbarHide,
  ...text,
};
