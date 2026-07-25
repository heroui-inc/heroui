import {REACT_SCAN_GLOBAL_TYPE_ID} from "./constants";

export {REACT_SCAN_GLOBAL_TYPE_ID};

export const reactScanGlobalType = {
  [REACT_SCAN_GLOBAL_TYPE_ID]: {
    name: "React Scan",
    description: "Enable React Scan to detect performance issues",
    toolbar: {
      icon: "eye",
      items: [
        {value: "false", title: "React Scan Off", icon: "eyeclose"},
        {value: "true", title: "React Scan On", icon: "eye"},
      ],
      showName: true,
    },
  },
};
