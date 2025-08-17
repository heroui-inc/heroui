import {__PREVIEW__} from "@/utils/env";

export const GITHUB_URL = "https://github.com";

export const GITHUB_API_URL = "https://api.github.com";

export const RAW_GITHUB_URL = "https://raw.githubusercontent.com";

export const REPO_NAME = "heroui-inc/heroui";

export const ISSUE_REPORT_URL = `${GITHUB_URL}/${REPO_NAME}/issues/new?assignees=&labels=bug&template=bug_report.yml&title=%5BBUG%5D+-+`;

export const COMPONENT_PATH = __PREVIEW__
  ? `${GITHUB_URL}/${REPO_NAME}/tree/feat/v3/packages/react/src/components`
  : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/react/src/components`;

export const COMPONENT_STYLES_PATH = __PREVIEW__
  ? `${GITHUB_URL}/${REPO_NAME}/tree/feat/v3/packages/styles/components`
  : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/styles/components`;

export const STORYBOOK_URL = __PREVIEW__
  ? "https://v3-storybook.heroui.com"
  : "https://storybook.heroui.com";
