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
    if (!encodedStr || typeof encodedStr !== "string") return null;
    let base64 = encodedStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    // Use window.atob or global atob safely
    const atobFn = typeof window !== "undefined" ? window.atob : (str: string) => Buffer.from(str, "base64").toString("binary");
    const binary = atobFn(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);

    if (!parsed || typeof parsed !== "object") return null;

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
  } catch {
    // Gracefully handle expected invalid/malformed base64 or JSON strings without unhandled console errors
    return null;
  }
}

// ==============================================================================
// MITHAI BOX SHARING CODEC
// ==============================================================================

export interface ShareableMithaiBoxData {
  recipient: string;
  sender: string;
  message: string;
  boxStyle: "royal-crimson" | "midnight-gold" | "marigold-brass";
  sweets: string[];
  createdAt?: number;
}

export function encodeMithaiBoxData(data: ShareableMithaiBoxData): string {
  try {
    const jsonStr = JSON.stringify({
      r: data.recipient.trim().slice(0, 50),
      s: data.sender.trim().slice(0, 50),
      m: data.message.trim().slice(0, 500),
      b: data.boxStyle,
      sw: Array.isArray(data.sweets) ? data.sweets.slice(0, 8) : [],
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
    console.error("Error encoding mithai box state:", err);
    return "";
  }
}

export function decodeMithaiBoxData(encodedStr: string): ShareableMithaiBoxData | null {
  try {
    if (!encodedStr || typeof encodedStr !== "string") return null;
    let base64 = encodedStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const atobFn = typeof window !== "undefined" ? window.atob : (str: string) => Buffer.from(str, "base64").toString("binary");
    const binary = atobFn(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);

    if (!parsed || typeof parsed !== "object") return null;

    const validStyles = ["royal-crimson", "midnight-gold", "marigold-brass"];
    const boxStyle = validStyles.includes(parsed.b) ? parsed.b : "royal-crimson";
    const sweets = Array.isArray(parsed.sw) ? parsed.sw.map(String).slice(0, 8) : [];

    return {
      recipient: String(parsed.r || "Beloved Friend"),
      sender: String(parsed.s || "A Warm Well-wisher"),
      message: String(parsed.m || "Wishing your life is filled with the timeless sweetness of Diwali!"),
      boxStyle: boxStyle as ShareableMithaiBoxData["boxStyle"],
      sweets,
      createdAt: parsed.ts ? Number(parsed.ts) : undefined,
    };
  } catch {
    return null;
  }
}

// ==============================================================================
// SKY LANTERN SHARING CODEC
// ==============================================================================

export interface ShareableLanternData {
  id?: string;
  name: string;
  wish: string;
  color: "amber" | "saffron" | "rose" | "emerald";
  createdAt?: number;
}

export function encodeLanternData(data: ShareableLanternData): string {
  try {
    const jsonStr = JSON.stringify({
      id: data.id ? data.id.slice(0, 50) : undefined,
      n: data.name.trim().slice(0, 50),
      w: data.wish.trim().slice(0, 300),
      c: data.color,
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
    console.error("Error encoding lantern data:", err);
    return "";
  }
}

export function decodeLanternData(encodedStr: string): ShareableLanternData | null {
  try {
    if (!encodedStr || typeof encodedStr !== "string") return null;
    let base64 = encodedStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const atobFn =
      typeof window !== "undefined"
        ? window.atob
        : (str: string) => Buffer.from(str, "base64").toString("binary");
    const binary = atobFn(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);

    if (!parsed || typeof parsed !== "object") return null;

    const validColors = ["amber", "saffron", "rose", "emerald"];
    const color = validColors.includes(parsed.c) ? parsed.c : "amber";

    return {
      id: parsed.id ? String(parsed.id) : undefined,
      name: String(parsed.n || "Kind Soul"),
      wish: String(parsed.w || "May peace, health, and radiant joy illuminate every corner of our world."),
      color: color as ShareableLanternData["color"],
      createdAt: parsed.ts ? Number(parsed.ts) : undefined,
    };
  } catch {
    return null;
  }
}

