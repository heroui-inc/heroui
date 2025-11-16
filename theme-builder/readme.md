Installation

Clone your repo: git clone https://github.com/alimortazavi-pr/nextui-theme-builder.git
cd into folder.
npm install (adds prompt-sync for inputs; I skipped nodemon for now—dev it raw).

Usage
Run npm start. Prompts:

Theme name: e.g., "myheroapp"
Default colors: e.g., "white black" (light bg/text, dark bg/text)
Primary HEX: e.g., "#3b82f6" (blue)
Secondary HEX: e.g., "#6b7280"
Success HEX: e.g., "#10b981"
Warning HEX: e.g., "#f59e0b"
Danger HEX: e.g., "#ef4444"

Outputs: myheroapp-light.json and myheroapp-dark.json. Each has the theme object. Import to tailwind.config.js: