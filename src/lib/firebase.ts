import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  onSnapshot,
  Firestore,
} from "firebase/firestore";
import { LitDiyaData } from "@/components/diya/DiyaLightModal";
import { SkyLanternData } from "@/components/lanterns/SkyLanterns";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Checks if Firebase credentials are fully configured in the environment
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      !firebaseConfig.apiKey.includes("your-api-key")
  );
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

function getFirebaseDb(): Firestore | null {
  if (!isFirebaseConfigured()) return null;

  try {
    if (!appInstance) {
      appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    }
    if (!dbInstance && appInstance) {
      dbInstance = getFirestore(appInstance);
    }
    return dbInstance;
  } catch (err) {
    console.warn("Failed to initialize Firebase Firestore:", err);
    return null;
  }
}

// ==============================================================================
// DIYA OPERATIONS
// ==============================================================================

/**
 * Fetches public lit diyas from Firebase Firestore
 */
export async function fetchRemotePublicDiyas(maxItems = 100): Promise<LitDiyaData[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const diyasRef = collection(db, "diyas");
    const q = query(
      diyasRef,
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(maxItems)
    );
    const snapshot = await getDocs(q);

    const list: LitDiyaData[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        name: data.name || "Anonymous Devotee",
        message: data.message || "",
        style: data.style || "brass",
        isPublic: Boolean(data.isPublic),
        createdAt: Number(data.createdAt) || Date.now(),
      });
    });

    return list;
  } catch (err) {
    console.warn("Firebase fetch diyas error:", err);
    return [];
  }
}

/**
 * Saves a new lit diya to Firebase Firestore
 */
export async function insertRemoteDiya(diya: LitDiyaData): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    const diyaDoc = doc(db, "diyas", diya.id);
    await setDoc(diyaDoc, {
      id: diya.id,
      name: diya.name,
      message: diya.message,
      style: diya.style,
      isPublic: diya.isPublic,
      createdAt: diya.createdAt,
    });
    return true;
  } catch (err) {
    console.warn("Firebase insert diya error:", err);
    return false;
  }
}

/**
 * Subscribes in real-time to public diyas lit by any user worldwide
 */
export function subscribeToRemoteDiyas(onUpdate: (diya: LitDiyaData) => void): (() => void) | null {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const diyasRef = collection(db, "diyas");
    const q = query(
      diyasRef,
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            onUpdate({
              id: change.doc.id,
              name: data.name || "Anonymous Devotee",
              message: data.message || "",
              style: data.style || "brass",
              isPublic: true,
              createdAt: Number(data.createdAt) || Date.now(),
            });
          }
        });
      },
      (err) => {
        console.warn("Firebase realtime diyas snapshot error:", err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Failed to subscribe to Firebase diyas:", err);
    return null;
  }
}

// ==============================================================================
// LANTERN OPERATIONS
// ==============================================================================

/**
 * Fetches public sky lanterns from Firebase Firestore
 */
export async function fetchRemotePublicLanterns(maxItems = 100): Promise<SkyLanternData[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const lanternsRef = collection(db, "lanterns");
    const q = query(
      lanternsRef,
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(maxItems)
    );
    const snapshot = await getDocs(q);

    const list: SkyLanternData[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        name: data.name || "Anonymous Soul",
        wish: data.wish || "",
        color: data.color || "amber",
        isPublic: Boolean(data.isPublic),
        createdAt: Number(data.createdAt) || Date.now(),
      });
    });

    return list;
  } catch (err) {
    console.warn("Firebase fetch lanterns error:", err);
    return [];
  }
}

/**
 * Saves a new sky lantern to Firebase Firestore
 */
export async function insertRemoteLantern(lantern: SkyLanternData): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    const lanternDoc = doc(db, "lanterns", lantern.id);
    await setDoc(lanternDoc, {
      id: lantern.id,
      name: lantern.name,
      wish: lantern.wish,
      color: lantern.color,
      isPublic: lantern.isPublic,
      createdAt: lantern.createdAt,
    });
    return true;
  } catch (err) {
    console.warn("Firebase insert lantern error:", err);
    return false;
  }
}

/**
 * Subscribes in real-time to public sky lanterns released by any user worldwide
 */
export function subscribeToRemoteLanterns(onUpdate: (lantern: SkyLanternData) => void): (() => void) | null {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const lanternsRef = collection(db, "lanterns");
    const q = query(
      lanternsRef,
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            onUpdate({
              id: change.doc.id,
              name: data.name || "Anonymous Soul",
              wish: data.wish || "",
              color: data.color || "amber",
              isPublic: true,
              createdAt: Number(data.createdAt) || Date.now(),
            });
          }
        });
      },
      (err) => {
        console.warn("Firebase realtime lanterns snapshot error:", err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Failed to subscribe to Firebase lanterns:", err);
    return null;
  }
}

