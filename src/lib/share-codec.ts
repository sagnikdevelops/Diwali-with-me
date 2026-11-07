export interface ShareableGreetingData {
  recipient: string;
  sender: string;
  message: string;
  template: "royal" | "minimal" | "gold" | "family" | "modern" | "spiritual";
  blessing?: string;
  diyaStyle?: string;
  createdAt?: number;
}

export function encodeGreetingData(data: ShareableGreetingData): string {
  try {
    const jsonStr = JSON.stringify({
      r: data.recipient.trim().slice(0, 50),
      s: data.sender.trim().slice(0, 50),
      m: data.message.trim().slice(0, 500),
      t: data.template,
      b: data.blessing ? data.blessing.trim().slice(0, 100) : undefined,
      d: data.diyaStyle,
      ts: data.createdAt || Date.now(),
    });

    const bytes = new TextEncoder().encode(jsonStr);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch (err) {
    console.error("Error encoding greeting state:", err);
    return "";
  }
}

export function decodeGreetingData(encodedStr: string): ShareableGreetingData | null {
  try {
    if (!encodedStr) return null;
    let base64 = encodedStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);

    const validTemplates = ["royal", "minimal", "gold", "family", "modern", "spiritual"];
    const template = validTemplates.includes(parsed.t) ? parsed.t : "royal";

    return {
      recipient: String(parsed.r || "Dear Friend"),
      sender: String(parsed.s || "Well-wisher"),
      message: String(parsed.m || "Wishing you and your family a joyful, luminous, and prosperous Diwali!"),
      template: template as ShareableGreetingData["template"],
      blessing: parsed.b ? String(parsed.b) : undefined,
      diyaStyle: parsed.d ? String(parsed.d) : undefined,
      createdAt: parsed.ts ? Number(parsed.ts) : undefined,
    };
  } catch (err) {
    console.error("Error decoding greeting state:", err);
    return null;
  }
}
