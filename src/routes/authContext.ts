import { auth, googleProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { supabase } from "../backend/supabaseClient";

const db = getFirestore(app);

interface UserData {
  username?: string;
  email: string;
  registeredAt?: string;
  displayName?: string;
  photoURL?: string;
  uid?: string;
}

interface AuthResult {
  success: boolean;
  user?: UserData;
  error?: string;
}

// Google Sign In
export async function SignInWithGoogle(): Promise<UserData> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check user status in Firestore first
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    // Check if user is blocked
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.status === "blocked") {
        await auth.signOut();
        throw new Error("Your account has been blocked. Please contact support.");
      }
      
      // Update last login
      await setDoc(userDocRef, {
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } else {
      // First time sign in - create user document
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
      });
    }

    // Store Firebase UID in Supabase
    const { error } = await supabase
      .from('users')
      .upsert({ uid: user.uid }, { onConflict: 'uid' });

    if (error) {
      console.error("Error storing UID in Supabase:", error);
    }

  } catch (error: any) {
    console.error("Error checking/saving user to Firestore:", error);
    if (error.message.includes("blocked")) {
      throw error;
    }
  }

  // Store user data in localStorage
  const userData: UserData = {
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    uid: user.uid,
    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("isAuthenticated", "true");

  return userData;
}
//=========================================================================

// Email/Password Registration
export function registerWithEmail(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): AuthResult {
  // Validation
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  // Check if user already exists
  const existingUser = localStorage.getItem("user");
  if (existingUser) {
    const parsed = JSON.parse(existingUser) as UserData;
    if (parsed.email === email) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }
  }

  // Generate a unique UID for email/password users (since they don't have Firebase UID)
  const generatedUID = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Create user data
  const userData: UserData = {
    username,
    email,
    uid: generatedUID,
    registeredAt: new Date().toISOString(),
  };

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("userPassword", password);
  localStorage.setItem("isAuthenticated", "true");

  // Store UID in Supabase
  supabase
    .from('users')
    .insert({ uid: generatedUID })
    .then(({ error }) => {
      if (error) console.error("Error storing UID in Supabase:", error);
    });

  return { success: true, user: userData };
}
//=====================================================================================
// Email/Password Login
export function signInWithEmail(email: string, password: string): AuthResult {
  const storedUser = localStorage.getItem("user");
  const storedPassword = localStorage.getItem("userPassword");

  if (!storedUser) {
    return { success: false, error: "No account found. Please sign up first." };
  }

  const userData = JSON.parse(storedUser) as UserData;

  if (userData.email !== email || storedPassword !== password) {
    return { success: false, error: "Invalid email or password" };
  }

  localStorage.setItem("isAuthenticated", "true");
  return { success: true, user: userData };
}
//================================================================================

// Sign Out
export function signOut(): void {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
  localStorage.removeItem("userPassword");
}

//+++++++++++++++++++++++++++++=++++++++++++++
// for storing user data and can be easily call from other page
export function getCurrentUser(): UserData | null {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated !== "true") {
    return null;
  }

  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser) as UserData;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return localStorage.getItem("isAuthenticated") === "true";
}