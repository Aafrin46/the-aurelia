import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { UserProfile } from '../types';
import { syncUserProfileApi } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: User | null;
  idToken: string | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setDemoUser: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  idToken: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  setDemoUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aurelia_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);

          // Synchronize user to Cloud SQL PostgreSQL database
          const syncRes = await syncUserProfileApi(token, currentUser.displayName || undefined);
          const dbUser = syncRes.user;

          const profile: UserProfile = {
            name: dbUser?.name || currentUser.displayName || currentUser.email?.split('@')[0] || 'Patron',
            email: currentUser.email || '',
            memberTier: dbUser?.memberTier || 'Aurelia Ambassador',
            joinedYear: '2024',
            points: dbUser?.points ?? 5000,
          };

          setUser(profile);
          localStorage.setItem('aurelia_user', JSON.stringify(profile));
        } catch (err) {
          console.error('Error syncing user profile:', err);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      console.error('Google Sign In error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error('Firebase sign out error:', err);
    }
    setUser(null);
    setIdToken(null);
    localStorage.removeItem('aurelia_user');
  };

  const setDemoUser = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('aurelia_user', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        idToken,
        loading,
        signInWithGoogle,
        signOut,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
