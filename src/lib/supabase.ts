import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { LitDiyaData } from "@/components/diya/DiyaLightModal";
import { SkyLanternData } from "@/components/lanterns/SkyLanterns";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientInstance: SupabaseClient | null = null;

/**
 * Checks if Supabase credentials are configured in the environment
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http"));
}

/**
 * Returns the Supabase client singleton, or null if not configured
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance && supabaseUrl && supabaseAnonKey) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return clientInstance;
}

// ==============================================================================
// DIYA OPERATIONS
// ==============================================================================

interface DiyaRow {
  id: string;
  name: string;
  message: string;
  style: string;
  is_public: boolean;
  created_at: number;
}

function mapRowToDiya(row: DiyaRow): LitDiyaData {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    style: (row.style as LitDiyaData["style"]) || "brass",
    isPublic: row.is_public,
    createdAt: Number(row.created_at) || Date.now(),
  };
}

/**
 * Fetches public diyas from Supabase ordered by creation time
 */
export async function fetchRemotePublicDiyas(limit = 100): Promise<LitDiyaData[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from("diyas")
      .select("id, name, message, style, is_public, created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.warn("Supabase fetch diyas failed:", error?.message);
      return [];
    }

    return (data as DiyaRow[]).map(mapRowToDiya);
  } catch (err) {
    console.warn("Supabase diyas network error:", err);
    return [];
  }
}

/**
 * Inserts a new diya into Supabase
 */
export async function insertRemoteDiya(diya: LitDiyaData): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row: DiyaRow = {
      id: diya.id,
      name: diya.name,
      message: diya.message,
      style: diya.style,
      is_public: diya.isPublic,
      created_at: diya.createdAt,
    };

    const { error } = await client.from("diyas").insert(row);
    if (error) {
      console.warn("Supabase insert diya failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase insert diya exception:", err);
    return false;
  }
}

/**
 * Subscribes to new diya inserts in real-time
 */
export function subscribeToRemoteDiyas(onInsert: (diya: LitDiyaData) => void): (() => void) | null {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("realtime:diyas")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "diyas",
          filter: "is_public=eq.true",
        },
        (payload) => {
          if (payload.new) {
            onInsert(mapRowToDiya(payload.new as DiyaRow));
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.warn("Supabase realtime subscription failed:", err);
    return null;
  }
}

// ==============================================================================
// LANTERN OPERATIONS
// ==============================================================================

interface LanternRow {
  id: string;
  name: string;
  wish: string;
  color: string;
  is_public: boolean;
  created_at: number;
}

function mapRowToLantern(row: LanternRow): SkyLanternData {
  return {
    id: row.id,
    name: row.name,
    wish: row.wish,
    color: (row.color as SkyLanternData["color"]) || "amber",
    isPublic: row.is_public,
    createdAt: Number(row.created_at) || Date.now(),
  };
}

/**
 * Fetches public sky lanterns from Supabase ordered by creation time
 */
export async function fetchRemotePublicLanterns(limit = 100): Promise<SkyLanternData[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from("lanterns")
      .select("id, name, wish, color, is_public, created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.warn("Supabase fetch lanterns failed:", error?.message);
      return [];
    }

    return (data as LanternRow[]).map(mapRowToLantern);
  } catch (err) {
    console.warn("Supabase lanterns network error:", err);
    return [];
  }
}

/**
 * Inserts a new sky lantern into Supabase
 */
export async function insertRemoteLantern(lantern: SkyLanternData): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row: LanternRow = {
      id: lantern.id,
      name: lantern.name,
      wish: lantern.wish,
      color: lantern.color,
      is_public: lantern.isPublic,
      created_at: lantern.createdAt,
    };

    const { error } = await client.from("lanterns").insert(row);
    if (error) {
      console.warn("Supabase insert lantern failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase insert lantern exception:", err);
    return false;
  }
}

/**
 * Subscribes to new lantern inserts in real-time
 */
export function subscribeToRemoteLanterns(onInsert: (lantern: SkyLanternData) => void): (() => void) | null {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("realtime:lanterns")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "lanterns",
          filter: "is_public=eq.true",
        },
        (payload) => {
          if (payload.new) {
            onInsert(mapRowToLantern(payload.new as LanternRow));
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.warn("Supabase realtime subscription failed:", err);
    return null;
  }
}

