import type {ShowcaseItem} from "../types";

import {CORE_TEAM_AUTHORS} from "../authors";
import AppleIPhoneCameraZoom from "../navigation/apple-iphone-camera-zoom";
import AppleIPhoneDisclosure from "../navigation/apple-iphone-disclosure";

const SHOWCASE_CDN_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases";

export const navigationShowcases: ShowcaseItem[] = [
  {
    author: CORE_TEAM_AUTHORS["jrgarciadev"],
    component: AppleIPhoneDisclosure,
    components: ["DisclosureGroup", "Disclosure", "Button"],
    defaultTheme: "dark",
    description: "Product feature showcase with disclosure groups inspired by Apple",
    file: "apple-iphone-disclosure.tsx",
    name: "apple-iphone-disclosure",
    posterUrl: `${SHOWCASE_CDN_URL}/1.jpg`,
    status: "new",
    supportsThemeSwitching: false,
    title: "Apple iPhone 17 Pro Disclosure",
    videoUrl: `${SHOWCASE_CDN_URL}/1.mp4`,
  },
  {
    author: CORE_TEAM_AUTHORS["jrgarciadev"],
    component: AppleIPhoneCameraZoom,
    components: ["Tabs"],
    defaultTheme: "dark",
    description: "Interactive camera zoom showcase inspired by Apple's iPhone 17 Pro",
    file: "apple-iphone-camera-zoom.tsx",
    name: "apple-iphone-camera-zoom",
    posterUrl: `${SHOWCASE_CDN_URL}/2.jpg`,
    status: "new",
    supportsThemeSwitching: false,
    title: "Apple iPhone 17 Pro Camera Zoom",
    videoUrl: `${SHOWCASE_CDN_URL}/2.mp4`,
  },
];
