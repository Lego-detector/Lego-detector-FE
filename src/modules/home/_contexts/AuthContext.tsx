'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { removeCredentials, getUserProfile, removeUserProfile } from '@/shared/utils/cookie';
import { UserProfile } from '../_types/user.type';
import { redirect } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  const logout = async () => {
    await fetch(`${process.env.BACKEND_URL}/revoke`, {
      method: 'POST',
      credentials: 'include',
    });

    removeCredentials();
    removeUserProfile();
    setUser(null);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
