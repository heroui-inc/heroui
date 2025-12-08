export const REDUCE_MOTION_ADDON_ID = "heroui-reduce-motion-addon";
export const REDUCE_MOTION_GLOBAL_TYPE_ID = "heroui-reduce-motion";
export const REDUCE_MOTION_PARAM_KEY = "heroui-reduce-motion";

export const REDUCE_MOTION_VALUES = ["true", "false"] as const;
export type ReduceMotionKey = (typeof REDUCE_MOTION_VALUES)[number];

export const DEFAULT_REDUCE_MOTION: ReduceMotionKey = "false";

export interface ReduceMotionOption {
  value: ReduceMotionKey;
  title: string;
  icon?: string;
}

export const REDUCE_MOTION_OPTIONS: ReduceMotionOption[] = [
  {
    value: "false",
    title: "Motion On",
    icon: "play",
  },
  {
    value: "true",
    title: "Motion Reduced",
    icon: "stop",
  },
];

