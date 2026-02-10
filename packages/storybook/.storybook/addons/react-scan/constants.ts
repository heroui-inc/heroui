export const REACT_SCAN_ADDON_ID = "heroui-react-scan-addon";
export const REACT_SCAN_GLOBAL_TYPE_ID = "heroui-react-scan";
export const REACT_SCAN_PARAM_KEY = "heroui-react-scan";

export const REACT_SCAN_VALUES = ["true", "false"] as const;
export type ReactScanKey = (typeof REACT_SCAN_VALUES)[number];

export const DEFAULT_REACT_SCAN: ReactScanKey = "false";
