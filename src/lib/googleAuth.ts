import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
// Obfuscated runtime credentials resolver
const getFirebaseConfig = () => {
  try {
    const raw = atob(
      'eyJwcm9qZWN0SWQiOiJncmFtLWJhbmdsYS1yZXNvcnQtZGE0Y2MiLCJhcHBJZCI6IjE6NDQ3NTE1MzEwNzQzOndlYjo3ZjUyMjVkNjRjMWEyYjJhZTI4N2QyIiwiYXBpS2V5IjoiQUl6YVN5RGxSVTRBTWFjUUpPZC1YQ3ZMNVFfa01PTmJOMHc3cGRBIiwiYXV0aERvbWFpbiI6ImdyYW0tYmFuZ2xhLXJlc29ydC1kYTRjYy5maXJlYmFzZWFwcC5jb20iLCJzdG9yYWdlQnVja2V0IjoiZ3JhbS1iYW5nbGEtcmVzb3J0LWRhNGNjLmZpcmViYXNlc3RvcmFnZS5hcHAiLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjQ0NzUxNTMxMDc0MyIsIm1lYXN1cmVtZW50SWQiOiJHLUVZWDQ3NUJWMkcifQ=='
    );
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

// Initialize Firebase App singleton safely
const app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
export const auth = getAuth(app);

// Provider with standard scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Authorized admin emails for Gram Bangla Resort
export const AUTHORIZED_ADMIN_EMAILS = [
  'grambanglaresortbankura2022@gmail.com',
  'debashiskhan586@gmail.com',
];

export interface GoogleUserProfile {
  name?: string;
  email: string;
  picture?: string;
}

export interface GoogleAuthResult {
  success: boolean;
  user?: User;
  email?: string;
  profile?: GoogleUserProfile;
  isAuthorized?: boolean;
  error?: string;
}

/**
 * Sign in directly with official Firebase Google Auth Popup
 */
export async function signInWithGooglePopup(): Promise<GoogleAuthResult> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const email = user.email?.trim().toLowerCase() || '';

    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
      (authEmail) => authEmail.toLowerCase() === email
    );

    if (isAuthorized) {
      localStorage.setItem('gb_admin_auth', email);
      sessionStorage.setItem('gb_admin_auth', email);
      return {
        success: true,
        user,
        email,
        isAuthorized: true,
        profile: {
          name: user.displayName || 'Resort Admin',
          email,
          picture: user.photoURL || undefined,
        },
      };
    } else {
      await firebaseSignOut(auth);
      localStorage.removeItem('gb_admin_auth');
      sessionStorage.removeItem('gb_admin_auth');
      return {
        success: false,
        user,
        email,
        isAuthorized: false,
        error: `Access Denied: ${email} is not authorized to manage Gram Bangla Resort. Please sign in with an authorized administrator account.`,
      };
    }
  } catch (error: any) {
    console.error('Firebase Google Auth Error:', error);
    let message = 'Unable to complete Google sign-in.';
    if (error.code === 'auth/popup-closed-by-user') {
      message = 'Sign-in cancelled: The login popup was closed before completing.';
    } else if (error.code === 'auth/popup-blocked') {
      message = 'Popup was blocked by your browser. Please allow popups for this site and try again.';
    } else if (error.code === 'auth/unauthorized-domain') {
      message = 'Domain authorization notice: This domain must be added to Authorized Domains in your Firebase Auth console.';
    } else if (error.code === 'auth/operation-not-allowed') {
      message = 'Google Sign-in is not enabled in your Firebase project. Please enable Google in Firebase Console > Authentication > Sign-in method.';
    } else if (error.message) {
      message = error.message;
    }
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Sign out from Google & Firebase session
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.warn('Sign out warning:', e);
  }
  localStorage.removeItem('gb_admin_auth');
  sessionStorage.removeItem('gb_admin_auth');
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuthChanges(callback: (user: User | null, isAuthorized: boolean) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email) {
      const email = user.email.trim().toLowerCase();
      const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (authEmail) => authEmail.toLowerCase() === email
      );
      callback(user, isAuthorized);
    } else {
      callback(null, false);
    }
  });
}
