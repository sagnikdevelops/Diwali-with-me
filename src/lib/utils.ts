import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeText(input: string, maxLength = 150): string {
  if (!input) return "";
  // Strip control characters, keep standard printable characters, emojis and Indian scripts
  return input
    .replace(/[<>'"&]/g, (match) => {
      switch (match) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        case "&":
          return "&amp;";
        default:
          return match;
      }
    })
    .trim()
    .slice(0, maxLength);
}
