import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

import baseReactConfig from "@heroui/standard/eslint/next.mjs";
import {defineConfig} from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = defineConfig([...baseReactConfig]);

export default config;
