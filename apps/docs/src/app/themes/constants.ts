import airbnbTheme from "@/assets/themes/airbnb.png";
import blackTheme from "@/assets/themes/black.png";
import coinbaseTheme from "@/assets/themes/coinbase.png";
import defaultTheme from "@/assets/themes/default.png";
import discordTheme from "@/assets/themes/discord.png";
import glassTheme from "@/assets/themes/glass.png";
import lavenderTheme from "@/assets/themes/lavender.png";
import mintTheme from "@/assets/themes/mint.png";
import netflixTheme from "@/assets/themes/netflix.png";
import rabbitTheme from "@/assets/themes/rabbit.png";
import skyTheme from "@/assets/themes/sky.png";
import spotifyTheme from "@/assets/themes/spotify.png";

export const tabs = ["components", "dashboard", "mail", "chat", "finances"];

export const colors = [
  {id: "#0072f5", value: "#0072f5"},
  {id: "#EF4444", value: "#EF4444"},
  {id: "#F59E0B", value: "#F59E0B"},
  {id: "#10B981", value: "#10B981"},
  {id: "#D946EF", value: "#D946EF"},
  {id: "#000000", value: "#000000"},
];

export const fonts = [
  {id: "inter", label: "Inter", variable: "--font-inter"},
  {id: "figtree", label: "Figtree", variable: "--font-figtree"},
  {id: "hanken-grotesk", label: "Hanken Grotesk", variable: "--font-hanken-grotesk"},
  {id: "geist", label: "Geist", variable: "--font-geist"},
  {id: "dm-sans", label: "DM Sans", variable: "--font-dm-sans"},
  {id: "public-sans", label: "Public Sans", variable: "--font-public-sans"},
  {id: "google-sans", label: "Google Sans", variable: "--font-google-sans"},
];

export const radiusOptions = [
  {description: "none", id: "none", label: "-", value: "none"},
  {description: "extra small", id: "extra-small", label: "XS", value: "extra-small"},
  {description: "small", id: "small", label: "S", value: "small"},
  {description: "medium", id: "medium", label: "M", value: "medium"},
  {description: "large", id: "large", label: "LG", value: "large"},
  {description: "extra large", id: "extra-large", label: "XL", value: "extra-large"},
];

export const themes = [
  {id: "default", image: defaultTheme, label: "Default", value: "default"},
  {id: "airbnb", image: airbnbTheme, label: "Airbnb", value: "airbnb"},
  {id: "black", image: blackTheme, label: "Black", value: "black"},
  {id: "coinbase", image: coinbaseTheme, label: "Coinbase", value: "coinbase"},
  {id: "discord", image: discordTheme, label: "Discord", value: "discord"},
  {id: "glass", image: glassTheme, label: "Glass", value: "glass"},
  {id: "lavender", image: lavenderTheme, label: "Lavender", value: "lavender"},
  {id: "mint", image: mintTheme, label: "Mint", value: "mint"},
  {id: "netflix", image: netflixTheme, label: "Netflix", value: "netflix"},
  {id: "rabbit", image: rabbitTheme, label: "Rabbit", value: "rabbit"},
  {id: "sky", image: skyTheme, label: "Sky", value: "sky"},
  {id: "spotify", image: spotifyTheme, label: "Spotify", value: "spotify"},
];
