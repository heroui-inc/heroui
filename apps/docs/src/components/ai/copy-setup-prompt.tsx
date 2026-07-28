import {CopyPromptButton} from "./copy-prompt-button";

const PROMPT = `These are official instructions from HeroUI to set up a good AI development environment for building UIs with HeroUI v3 (\`@heroui/react\`).

Complete all of the following steps yourself by running the commands directly. Do not ask the user to run any of these commands.

- Install the HeroUI skill and register the HeroUI MCP server

---

## 1. Install the HeroUI skill

The installer detects your tool (Claude Code, Cursor, OpenCode, and more) and places the skill in the correct directory:

\`\`\`
curl -fsSL https://heroui.com/install | bash -s heroui-react
\`\`\`

Or using the skills package:

\`\`\`
npx skills add heroui-inc/heroui
\`\`\`

## 2. Register the HeroUI MCP server

The MCP gives your agent live access to component docs, source code, CSS, and theme variables. Use the correct section for your agent below.

### Claude Code

\`\`\`
claude mcp add heroui-react -- npx -y @heroui/react-mcp@latest
\`\`\`

### Cursor — \`.cursor/mcp.json\`

Add under \`"mcpServers"\`:

\`\`\`json
"heroui-react": { "command": "npx", "args": ["-y", "@heroui/react-mcp@latest"] }
\`\`\`

### VS Code — \`.vscode/mcp.json\`

Add under \`"servers"\`:

\`\`\`json
"heroui-react": { "type": "stdio", "command": "npx", "args": ["-y", "@heroui/react-mcp@latest"] }
\`\`\`

### Windsurf — \`.windsurf/mcp.json\`

Add under \`"mcpServers"\`:

\`\`\`json
"heroui-react": { "command": "npx", "args": ["-y", "@heroui/react-mcp@latest"] }
\`\`\`

### Zed — \`settings.json\`

Add under \`"context_servers"\`:

\`\`\`json
"heroui-react": { "command": "npx", "args": ["-y", "@heroui/react-mcp@latest"], "env": {} }
\`\`\`

### Codex — \`~/.codex/config.toml\`

\`\`\`toml
[mcp_servers.heroui-react]
command = "npx"
args = ["-y", "@heroui/react-mcp@latest"]
\`\`\`

### OpenCode — \`opencode.json\`

Add under \`"mcp"\`:

\`\`\`json
"heroui-react": { "type": "local", "command": ["npx", "-y", "@heroui/react-mcp@latest"] }
\`\`\`

Restart the agent after adding the config, then verify the \`heroui-react\` MCP is connected.

Once done, tell the user:

\`\`\`
✓ Skill: heroui-react
✓ MCP server: heroui-react
⚡ Restart your agent to load the MCP server
\`\`\`

---

## Resources

- Quick Start: https://heroui.com/docs/react/getting-started/quick-start
- MCP server: https://heroui.com/docs/react/getting-started/mcp-server
- Agent Skills: https://heroui.com/docs/react/getting-started/agent-skills

These instructions are published at https://heroui.com/docs/react/getting-started so you can re-verify their authenticity at any time.`;

/**
 * CopySetupPrompt
 *
 * Header action for the React getting-started docs that copies the official
 * HeroUI v3 (OSS) AI setup prompt to the clipboard.
 */
export function CopySetupPrompt() {
  return <CopyPromptButton prompt={PROMPT} />;
}
