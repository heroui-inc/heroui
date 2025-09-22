import type {ShowcaseAuthor} from "./types";

export const CORE_TEAM_AUTHORS: Record<string, ShowcaseAuthor> = {
  jrgarciadev: {
    link: "https://x.com/jrgarciadev",
    name: "Junior Garcia",
    username: "jrgarciadev",
  },
};

export const COMMUNITY_AUTHORS: Record<string, ShowcaseAuthor> = {
  // Community contributors will be added here
  // example: {
  //   link: "https://github.com/username",
  //   name: "Full Name",
  //   username: "username",
  // },
};

export const ALL_AUTHORS = {
  ...CORE_TEAM_AUTHORS,
  ...COMMUNITY_AUTHORS,
};
