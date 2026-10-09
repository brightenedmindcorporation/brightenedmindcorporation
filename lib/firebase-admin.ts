import { cert, getApps, getApp, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Server-only Firebase Admin singleton. Requires FIREBASE_SERVICE_ACCOUNT_KEY
 * (the Firebase console's service-account JSON, base64-encoded) to be set —
 * generate it in Firebase Console > Project Settings > Service Accounts.
 *
 * Until that env var exists, isAdminConfigured() returns false and callers
 * fall back to treating the request as unauthenticated rather than crashing
 * the build/dev server.
 */

export function isAdminConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
}

let cachedApp: App | null = null;

function getAdminApp(): App {
  if (!isAdminConfigured()) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not set — Firebase Admin is not configured."
    );
  }
  if (cachedApp) return cachedApp;
  if (getApps().length) {
    cachedApp = getApp();
    return cachedApp;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string;
  const json = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf-8");
  const serviceAccount = JSON.parse(json);

  cachedApp = initializeApp({ credential: cert(serviceAccount) });
  return cachedApp;
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
