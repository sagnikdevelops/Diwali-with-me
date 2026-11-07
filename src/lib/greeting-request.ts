export interface GreetingRequestData {
  recipient: string;
  language: string;
  tone: string;
  relationship: string;
  theme: string;
}

export type GreetingRequestResult =
  | { ok: true; data: GreetingRequestData }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseGreetingRequest(value: unknown): GreetingRequestResult {
  if (!isRecord(value)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const fields = ["recipient", "language", "tone", "relationship", "theme"] as const;
  for (const field of fields) {
    if (value[field] !== undefined && typeof value[field] !== "string") {
      return { ok: false, error: `"${field}" must be a string.` };
    }
  }

  const getText = (field: (typeof fields)[number], fallback: string, maxLength: number) => {
    const text = value[field];
    return typeof text === "string" && text.trim()
      ? text.trim().slice(0, maxLength)
      : fallback;
  };

  return {
    ok: true,
    data: {
      recipient: getText("recipient", "Friend", 50),
      language: getText("language", "English", 30),
      tone: getText("tone", "Warm & Heartfelt", 40),
      relationship: getText("relationship", "Family", 40),
      theme: getText("theme", "", 100),
    },
  };
}
