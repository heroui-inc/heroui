#!/bin/bash
# HeroUI Command & Skill Installer
# https://v3.heroui.com

set -e

# URLs
COMMAND_URL="{{BASE_URL}}/heroui.md"
SKILL_URL="{{BASE_URL}}/skills/react.tar.gz"

INSTALLED=0

echo "Installing HeroUI command & skill..."
echo ""

# Claude Code - Skill only (skills are auto-discovered, no command needed)
if [ -d "$HOME/.claude" ]; then
  mkdir -p "$HOME/.claude/skills/heroui"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.claude/skills/heroui"
  echo "✓ Installed skill for Claude Code"
  INSTALLED=$((INSTALLED + 1))
fi

# Cursor - Install command AND skill
if [ -d "$HOME/.cursor" ]; then
  # Install command
  mkdir -p "$HOME/.cursor/commands"
  curl -sL -o "$HOME/.cursor/commands/heroui.md" "$COMMAND_URL?ide=cursor"
  echo "✓ Installed command for Cursor"

  # Install skill
  mkdir -p "$HOME/.cursor/skills/heroui"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.cursor/skills/heroui"
  echo "✓ Installed skill for Cursor"

  INSTALLED=$((INSTALLED + 1))
fi

# OpenCode - Install command AND skill
if command -v opencode &> /dev/null || [ -d "$HOME/.config/opencode" ]; then
  # Install command
  mkdir -p "$HOME/.config/opencode/command"
  curl -sL -o "$HOME/.config/opencode/command/heroui.md" "$COMMAND_URL?ide=opencode"
  echo "✓ Installed command for OpenCode"

  # Install skill
  mkdir -p "$HOME/.config/opencode/skill/heroui"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.config/opencode/skill/heroui"
  echo "✓ Installed skill for OpenCode"

  INSTALLED=$((INSTALLED + 1))
fi

# Codex CLI - Install command AND skill
if command -v codex &> /dev/null || [ -d "$HOME/.codex" ]; then
  # Install command
  mkdir -p "$HOME/.codex/prompts"
  curl -sL -o "$HOME/.codex/prompts/heroui.md" "$COMMAND_URL?ide=codex"
  echo "✓ Installed command for Codex"

  # Install skill
  mkdir -p "$HOME/.codex/skills/heroui"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.codex/skills/heroui"
  echo "✓ Installed skill for Codex"

  INSTALLED=$((INSTALLED + 1))
fi

# Antigravity (Gemini CLI) - Install command AND skill
if [ -d "$HOME/.gemini" ]; then
  # Install command (workflow)
  mkdir -p "$HOME/.gemini/antigravity/global_workflows"
  curl -sL -o "$HOME/.gemini/antigravity/global_workflows/heroui.md" "$COMMAND_URL?ide=antigravity"
  echo "✓ Installed command for Antigravity"

  # Install skill
  mkdir -p "$HOME/.gemini/antigravity/skills/heroui"
  curl -sL "$SKILL_URL" | tar xz -C "$HOME/.gemini/antigravity/skills/heroui"
  echo "✓ Installed skill for Antigravity"

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

echo "Done! Type /heroui in your editor to get started."
echo ""
echo "The heroui skill provides comprehensive component guidance."
echo "Your AI agent will use it automatically when building UIs."
