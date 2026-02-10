import {
  DEFAULT_REDUCE_MOTION,
  REDUCE_MOTION_GLOBAL_TYPE_ID,
  REDUCE_MOTION_OPTIONS,
} from "./constants";

export {REDUCE_MOTION_GLOBAL_TYPE_ID};

export const reduceMotionGlobalType = {
  [REDUCE_MOTION_GLOBAL_TYPE_ID]: {
    name: "Reduce Motion",
    description: "Reduce motion for components",
    defaultValue: DEFAULT_REDUCE_MOTION,
    toolbar: {
      icon: "play",
      items: REDUCE_MOTION_OPTIONS.map((option) => ({
        value: option.value,
        title: option.title,
        icon: option.icon,
      })),
      showName: true,
      dynamicTitle: true,
    },
  },
};
