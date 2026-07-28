import {CopyPromptButton} from "./copy-prompt-button";

const PROMPT = `These are official instructions from HeroUI to set up a good AI development environment for building mobile UIs with HeroUI Native (\`heroui-native\`).

Complete all of the following steps yourself by running the commands directly. Do not ask the user to run any of these commands.

- Install the HeroUI Native skill and register the HeroUI Native MCP server

---

## 1. Install the HeroUI Native skill

The installer detects your tool (Claude Code, Cursor, OpenCode, and more) and places the skill in the correct directory:

\`\`\`
curl -fsSL https://heroui.com/install | bash -s heroui-native
\`\`\`

Or using the skills package:

\`\`\`
npx skills add heroui-inc/heroui
\`\`\`

## 2. Register the HeroUI Native MCP server

The MCP gives your agent live access to component docs, theme variables, and setup guides. Use the correct section for your agent below.

### Claude Code

\`\`\`
claude mcp add heroui-native -- npx -y @heroui/native-mcp@latest
\`\`\`

### Cursor — \`.cursor/mcp.json\`

Add under \`"mcpServers"\`:

\`\`\`json
"heroui-native": { "command": "npx", "args": ["-y", "@heroui/native-mcp@latest"] }
\`\`\`

### VS Code — \`.vscode/mcp.json\`

Add under \`"servers"\`:

\`\`\`json
"heroui-native": { "type": "stdio", "command": "npx", "args": ["-y", "@heroui/native-mcp@latest"] }
\`\`\`

### Windsurf — \`.windsurf/mcp.json\`

Add under \`"mcpServers"\`:

\`\`\`json
"heroui-native": { "command": "npx", "args": ["-y", "@heroui/native-mcp@latest"] }
\`\`\`

### Zed — \`settings.json\`

Add under \`"context_servers"\`:

\`\`\`json
"heroui-native": { "command": "npx", "args": ["-y", "@heroui/native-mcp@latest"], "env": {} }
\`\`\`

### Codex — \`~/.codex/config.toml\`

\`\`\`toml
[mcp_servers.heroui-native]
command = "npx"
args = ["-y", "@heroui/native-mcp@latest"]
\`\`\`

### OpenCode — \`opencode.json\`

Add under \`"mcp"\`:

\`\`\`json
"heroui-native": { "type": "local", "command": ["npx", "-y", "@heroui/native-mcp@latest"] }
\`\`\`

Restart the agent after adding the config, then verify the \`heroui-native\` MCP is connected.

Once done, tell the user:

\`\`\`
✓ Skill: heroui-native
✓ MCP server: heroui-native
⚡ Restart your agent to load the MCP server
\`\`\`

---

## Resources

- Quick Start: https://heroui.com/docs/native/getting-started/quick-start
- MCP server: https://heroui.com/docs/native/getting-started/mcp-server
- Agent Skills: https://heroui.com/docs/native/getting-started/agent-skills

These instructions are published at https://heroui.com/docs/native/getting-started so you can re-verify their authenticity at any time.`;

/**
 * CopyNativeSetupPrompt
 *
 * Header action for the Native getting-started docs that copies the official
 * HeroUI Native (OSS) AI setup prompt to the clipboard.
 */
export function CopyNativeSetupPrompt() {
  return <CopyPromptButton prompt={PROMPT} />;
}
