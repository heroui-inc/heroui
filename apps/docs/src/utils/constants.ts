import {__DEV__, __IS_PRE_RELEASE__, __PREVIEW__} from "@/utils/env";

export const GITHUB_URL = "https://github.com";

export const GITHUB_API_URL = "https://api.github.com";

export const RAW_GITHUB_URL = "https://raw.githubusercontent.com";

export const REPO_NAME = "heroui-inc/heroui";

export const REPO_NAME_NATIVE = "heroui-inc/heroui-native";

export const ISSUE_REPORT_URL = `${GITHUB_URL}/${REPO_NAME}/issues/new?assignees=&labels=bug&template=bug_report.yml&title=%5BBUG%5D+-+`;

export const COMPONENT_PATH =
  __IS_PRE_RELEASE__ || __PREVIEW__
    ? `${GITHUB_URL}/${REPO_NAME}/tree/v3/packages/react/src/components`
    : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/react/src/components`;

export const COMPONENT_PATH_NATIVE = `${GITHUB_URL}/${REPO_NAME_NATIVE}/tree/rc/src/components`;

export const DOCS_CONTENT_PATH =
  __IS_PRE_RELEASE__ || __PREVIEW__
    ? `${GITHUB_URL}/${REPO_NAME}/blob/v3/apps/docs/content/docs`
    : `${GITHUB_URL}/${REPO_NAME}/blob/main/apps/docs/content/docs`;

export const RAW_DOCS_CONTENT_PATH =
  __IS_PRE_RELEASE__ || __PREVIEW__
    ? `${RAW_GITHUB_URL}/${REPO_NAME}/refs/heads/v3/apps/docs/content/docs`
    : `${RAW_GITHUB_URL}/${REPO_NAME}/refs/heads/main/apps/docs/content/docs`;

export const COMPONENT_STYLES_PATH =
  __IS_PRE_RELEASE__ || __PREVIEW__
    ? `${GITHUB_URL}/${REPO_NAME}/tree/v3/packages/styles/components`
    : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/styles/components`;

export const COMPONENT_STYLES_PATH_NATIVE = `${GITHUB_URL}/${REPO_NAME_NATIVE}/blob/rc/src/components`;

export const THEMES_PATH =
  __IS_PRE_RELEASE__ || __PREVIEW__
    ? `${GITHUB_URL}/${REPO_NAME}/tree/v3/packages/styles/themes`
    : `${GITHUB_URL}/${REPO_NAME}/tree/main/packages/styles/themes`;

export const STORYBOOK_URL = __DEV__
  ? "http://localhost:6006"
  : __IS_PRE_RELEASE__ || __PREVIEW__
    ? "https://storybook-v3.heroui.com"
    : "https://storybook.heroui.com";

export const CDN_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com";
