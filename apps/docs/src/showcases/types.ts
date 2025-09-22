export interface ShowcaseAuthor {
  name: string;
  username: string;
  link?: string;
}

export type Theme = "light" | "dark";

export interface ShowcaseItem {
  name: string;
  title: string;
  description: string;
  component: React.ComponentType;
  file: string;
  components: string[]; // Components used in the showcase
  supportsThemeSwitching?: boolean; // If false or undefined, theme switcher is disabled
  defaultTheme?: Theme; // Default theme for showcases that don't support switching
  author?: ShowcaseAuthor;
  status?: "new" | "updated"; // Status badge for showcase - undefined means no badge
  videoUrl?: string; // Optional video URL for showcase preview
  posterUrl?: string; // Optional poster image URL for video
}

export interface ShowcaseCategory {
  name: string;
  items: ShowcaseItem[];
}
