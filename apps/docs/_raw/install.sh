#!/bin/bash
# HeroUI Command & Skill Installer
# Usage: curl -sSL https://v3.heroui.com/install | bash -s [skill-name]
# Default: heroui-react
# Available skills: heroui-react, heroui-native
# https://v3.heroui.com

set -e

# Skill selection (default: heroui-react)
SKILL_NAME="${1:-heroui-react}"

# URLs
BASE_URL="${BASE_URL:-{{BASE_URL}}}"
COMMAND_URL="${BASE_URL}/heroui.md?skill=${SKILL_NAME}"
SKILL_URL="${BASE_URL}/skills/${SKILL_NAME}.tar.gz"

INSTALLED=0

echo "Installing HeroUI skill: ${SKILL_NAME}..."
echo ""

# Claude Code - Skill only (skills are auto-discovered, no command needed)
if [ -d "$HOME/.claude" ]; then
  mkdir -p "$HOME/.claude/skills/${SKILL_NAME}"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.claude/skills/${SKILL_NAME}"
  echo "✓ Installed ${SKILL_NAME} skill for Claude Code"
  INSTALLED=$((INSTALLED + 1))
fi

# Cursor - Install command AND skill
if [ -d "$HOME/.cursor" ]; then
  # Install command (skill-specific name to allow multiple skills)
  mkdir -p "$HOME/.cursor/commands"
  curl -sL -o "$HOME/.cursor/commands/${SKILL_NAME}.md" "$COMMAND_URL?ide=cursor"
  echo "✓ Installed ${SKILL_NAME} command for Cursor"

  # Install skill
  mkdir -p "$HOME/.cursor/skills/${SKILL_NAME}"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.cursor/skills/${SKILL_NAME}"
  echo "✓ Installed ${SKILL_NAME} skill for Cursor"

  INSTALLED=$((INSTALLED + 1))
fi

# OpenCode - Install command AND skill
if command -v opencode &> /dev/null || [ -d "$HOME/.config/opencode" ]; then
  # Install command (skill-specific name to allow multiple skills)
  mkdir -p "$HOME/.config/opencode/command"
  curl -sL -o "$HOME/.config/opencode/command/${SKILL_NAME}.md" "$COMMAND_URL?ide=opencode"
  echo "✓ Installed ${SKILL_NAME} command for OpenCode"

  # Install skill
  mkdir -p "$HOME/.config/opencode/skill/${SKILL_NAME}"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.config/opencode/skill/${SKILL_NAME}"
  echo "✓ Installed ${SKILL_NAME} skill for OpenCode"

  INSTALLED=$((INSTALLED + 1))
fi

# Codex CLI - Install command AND skill
if command -v codex &> /dev/null || [ -d "$HOME/.codex" ]; then
  # Install command (skill-specific name to allow multiple skills)
  mkdir -p "$HOME/.codex/prompts"
  curl -sL -o "$HOME/.codex/prompts/${SKILL_NAME}.md" "$COMMAND_URL?ide=codex"
  echo "✓ Installed ${SKILL_NAME} command for Codex"

  # Install skill
  mkdir -p "$HOME/.codex/skills/${SKILL_NAME}"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.codex/skills/${SKILL_NAME}"
  echo "✓ Installed ${SKILL_NAME} skill for Codex"

  INSTALLED=$((INSTALLED + 1))
fi

# Antigravity (Gemini CLI) - Install command AND skill
if [ -d "$HOME/.gemini" ]; then
  # Install command (workflow, skill-specific name to allow multiple skills)
  mkdir -p "$HOME/.gemini/antigravity/global_workflows"
  curl -sL -o "$HOME/.gemini/antigravity/global_workflows/${SKILL_NAME}.md" "$COMMAND_URL?ide=antigravity"
  echo "✓ Installed ${SKILL_NAME} command for Antigravity"

  # Install skill
  mkdir -p "$HOME/.gemini/antigravity/skills/${SKILL_NAME}"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.gemini/antigravity/skills/${SKILL_NAME}"
  echo "✓ Installed ${SKILL_NAME} skill for Antigravity"

  INSTALLED=$((INSTALLED + 1))
fi

echo ""

if [ $INSTALLED -eq 0 ]; then
  echo "No supported tools detected."
  echo ""
  echo "Install one of these first:"
  echo "  • Claude Code: https://claude.ai/code"
  echo "  • Cursor: https://cursor.com"
  echo "  • OpenCode: https://opencode.ai"
  echo "  • Codex: https://openai.com/codex"
  echo "  • Antigravity: https://antigravity.google"
  exit 1
fi

echo ""
echo "Done! The ${SKILL_NAME} skill is now available."
echo ""
echo "Type /${SKILL_NAME} in your editor to get started."
echo "The ${SKILL_NAME} skill provides comprehensive component guidance."
echo ""
echo "Your AI agent will use it automatically when relevant."
