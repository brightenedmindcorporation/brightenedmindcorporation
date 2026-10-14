import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// A second, named Firebase app used only by /teacher. Firebase keeps one
// signed-in user per app, so giving the teacher area its own app lets a
// teacher session and the admin session live side by side in the same
// browser without logging each other out.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const NAME = "teacher";
const app = getApps().some((a) => a.name === NAME) ? getApp(NAME) : initializeApp(firebaseConfig, NAME);
export const teacherAuth = getAuth(app);
