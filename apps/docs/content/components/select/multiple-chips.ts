import App from "./multiple-chips.raw.jsx?raw";
import AppTs from "./multiple-chips.raw.tsx?raw";

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
