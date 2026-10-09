'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  anweshaId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  // Kept for backward compat — volunteer app is always dark
  isDarkMode: true;
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const login = async (
    email: string,
    password: string,
    callbackUrl = "/admin/scanner"
  ) => {
    const toastId = toast.loading("Signing in...");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      let message = "Something went wrong.";
      switch (result.error) {
        case "ACCOUNT_LOCKED":
          message = "Account is locked. Contact admin.";
          break;
        case "EMAIL_NOT_VERIFIED":
          message = "Please verify your email first.";
          break;
        case "ACCESS_DENIED":
          message = "Access denied. Volunteer privileges required.";
          break;
        case "INVALID_CREDENTIALS":
          message = "Invalid email or password.";
          break;
        case "SERVER_UNAVAILABLE":
          message = "Server unavailable. Try again shortly.";
          break;
        default:
          message = "Login failed. Please try again.";
      }
      toast.error(message, { id: toastId });
      throw new Error(message);
    }

    toast.success("Welcome! Signed in successfully.", { id: toastId });
    router.push(callbackUrl);
    router.refresh();
  };

  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  const value: AuthContextType = {
    user: session
      ? {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name ?? undefined,
        role: session.user.role,
        anweshaId: session.user.anweshaId,
      }
      : null,
    token: session?.accessToken,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    login,
    logout,
    isDarkMode: true,
    toggleTheme: () => {}, // no-op: volunteer app is always dark
  };

  // Prevent flash before mount
  if (!mounted) {
    return <div className="min-h-screen bg-[#050507]" />;
  }

  return (
    <AuthContext.Provider value={value}>
      <div className="min-h-screen bg-[#050507] text-white">
        {children}
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}