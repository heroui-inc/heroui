/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Logger utility for HeroUI plugin
 * Provides consistent logging with colors and prefixes
 */

/* eslint-disable no-console */

type LogLevel = "info" | "success" | "warn" | "error" | "debug";

interface LoggerOptions {
  enabled?: boolean;
  prefix?: string;
}

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  // Text colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

const levelColors: Record<LogLevel, string> = {
  info: colors.cyan,
  success: colors.green,
  warn: colors.yellow,
  error: colors.red,
  debug: colors.gray,
};

export class Logger {
  private enabled: boolean;
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.enabled = options.enabled !== false;
    this.prefix = options.prefix || "[heroui]";
  }

  private formatMessage(level: LogLevel, message: string): string {
    const color = levelColors[level];
    const levelText = level.padEnd(7); // Align level text

    return `${color}${this.prefix} ${levelText}${colors.reset}${message}`;
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.enabled) return;

    const formattedMessage = this.formatMessage(level, message);

    switch (level) {
      case "error":
        console.error(formattedMessage, ...args);
        break;
      case "warn":
        console.warn(formattedMessage, ...args);
        break;
      default:
        console.log(formattedMessage, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    this.log("info", message, ...args);
  }

  success(message: string, ...args: any[]): void {
    this.log("success", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log("error", message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log("debug", message, ...args);
  }

  divider(char: string = "=", length: number = 80): void {
    if (!this.enabled) return;
    console.log(colors.gray + char.repeat(length) + colors.reset);
  }

  newline(): void {
    if (!this.enabled) return;
    console.log("");
  }
}
