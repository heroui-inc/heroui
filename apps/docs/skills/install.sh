#!/bin/bash
# HeroUI Skill Installer
# Usage: curl -sSL https://heroui.com/install | bash -s [skill-name]
# Default: heroui-react
# Available skills: heroui-react, heroui-native, heroui-migration
# Scope: HEROUI_SKILL_SCOPE=global (default, installs for every project) or
#        HEROUI_SKILL_SCOPE=project (installs into the current directory only)
# https://heroui.com

set -e

# Skill selection (default: heroui-react)
SKILL_NAME="${1:-heroui-react}"

# Install scope (default: global)
SKILL_SCOPE="${HEROUI_SKILL_SCOPE:-global}"
PROJECT_ROOT="$(pwd)"

# URLs
BASE_URL="${BASE_URL:-{{BASE_URL}}}"
SKILL_URL="${BASE_URL}/skills/${SKILL_NAME}.tar.gz"

# Codex CLI config home (override with CODEX_HOME)
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"

if [ "$SKILL_SCOPE" != "global" ] && [ "$SKILL_SCOPE" != "project" ]; then
  echo "Error: HEROUI_SKILL_SCOPE must be 'global' or 'project' (got '${SKILL_SCOPE}')."
  exit 1
fi

if [ "$SKILL_SCOPE" = "project" ] && [ "$PROJECT_ROOT" = "$HOME" ]; then
  echo "Error: HEROUI_SKILL_SCOPE=project cannot run from your home directory."
  echo ""
  echo "Change into your project directory first, or use the default global scope."
  exit 1
fi

INSTALLED=0
INSTALLED_DIRS=""

# Download and extract the skill, skipping a directory that already has it
# (Codex and Antigravity share .agents/skills in project scope)
install_skill() {
  local target_dir="$1" label="$2"

  if [ -n "$INSTALLED_DIRS" ] && printf '%s' "$INSTALLED_DIRS" | grep -qxF "$target_dir"; then
    return 0
  fi

  mkdir -p "$target_dir"
  curl -sL "$SKILL_URL" | tar xz -C "$target_dir"

  if [ "$SKILL_SCOPE" = "project" ]; then
    echo "✓ Installed ${SKILL_NAME} skill for ${label} (${target_dir#"$PROJECT_ROOT"/})"
  else
    echo "✓ Installed ${SKILL_NAME} skill for ${label}"
  fi

  INSTALLED_DIRS="${INSTALLED_DIRS}${target_dir}"$'\n'
  INSTALLED=$((INSTALLED + 1))
}

install_for_tool() {
  local label="$1" global_dir="$2" project_dir="$3"

  if [ "$SKILL_SCOPE" = "project" ]; then
    install_skill "$project_dir" "$label"
  else
    install_skill "$global_dir" "$label"
  fi
}

# Remove the old heroui skill (and its /heroui command) from a tool's home
# directory. Only for global installs: a project install must not delete the
# skills a user relies on everywhere else.
cleanup_legacy_skill() {
  local legacy_skill_dir="$1" legacy_command_file="$2"

  if [ "$SKILL_SCOPE" != "global" ] || [ "$SKILL_NAME" != "heroui-react" ]; then
    return 0
  fi

  if [ ! -d "$legacy_skill_dir" ]; then
    return 0
  fi

  rm -rf "$legacy_skill_dir"
  echo "✓ Removed old heroui skill"

  if [ -n "$legacy_command_file" ] && [ -f "$legacy_command_file" ]; then
    rm -f "$legacy_command_file"
    echo "✓ Removed old /heroui command"
  fi
}

if [ "$SKILL_SCOPE" = "project" ]; then
  echo "Installing HeroUI skill: ${SKILL_NAME} into ${PROJECT_ROOT}..."
else
  echo "Installing HeroUI skill: ${SKILL_NAME}..."
fi
echo ""

# Claude Code - Skill only (skills are auto-discovered, no command needed)
if [ -d "$HOME/.claude" ]; then
  install_for_tool "Claude Code" \
    "$HOME/.claude/skills/${SKILL_NAME}" \
    "$PROJECT_ROOT/.claude/skills/${SKILL_NAME}"
  cleanup_legacy_skill "$HOME/.claude/skills/heroui" ""
fi

# Cursor - Install skill
if [ -d "$HOME/.cursor" ]; then
  install_for_tool "Cursor" \
    "$HOME/.cursor/skills/${SKILL_NAME}" \
    "$PROJECT_ROOT/.cursor/skills/${SKILL_NAME}"
  cleanup_legacy_skill "$HOME/.cursor/skills/heroui" "$HOME/.cursor/commands/heroui.md"
fi

# OpenCode - Install skill
if command -v opencode &> /dev/null || [ -d "$HOME/.config/opencode" ]; then
  install_for_tool "OpenCode" \
    "$HOME/.config/opencode/skill/${SKILL_NAME}" \
    "$PROJECT_ROOT/.opencode/skills/${SKILL_NAME}"
  cleanup_legacy_skill "$HOME/.config/opencode/skill/heroui" "$HOME/.config/opencode/command/heroui.md"
fi

# Codex CLI - Install skill
if command -v codex &> /dev/null || [ -d "$CODEX_HOME" ]; then
  install_for_tool "Codex" \
    "$CODEX_HOME/skills/${SKILL_NAME}" \
    "$PROJECT_ROOT/.agents/skills/${SKILL_NAME}"
  cleanup_legacy_skill "$CODEX_HOME/skills/heroui" "$CODEX_HOME/prompts/heroui.md"
fi

# Antigravity (Gemini CLI) - Install skill
if [ -d "$HOME/.gemini" ]; then
  install_for_tool "Antigravity" \
    "$HOME/.gemini/antigravity/skills/${SKILL_NAME}" \
    "$PROJECT_ROOT/.agents/skills/${SKILL_NAME}"
  cleanup_legacy_skill "$HOME/.gemini/antigravity/skills/heroui" \
    "$HOME/.gemini/antigravity/global_workflows/heroui.md"
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
if [ "$SKILL_SCOPE" = "project" ]; then
  echo "Your AI agent will use it automatically when working in this project."
  echo "To install it for every project instead, rerun without HEROUI_SKILL_SCOPE=project."
else
  echo "Your AI agent will use it automatically when relevant."
  echo "To install it into a single project instead, rerun from that project with HEROUI_SKILL_SCOPE=project."
fi
