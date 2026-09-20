"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: "GUEST" | "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  transferCode: string;
}

interface AuthContextType {
  user: UserAccount | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateBalance: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    // Read saved user session from localStorage if exists
    const savedSession = localStorage.getItem("zunphoto_session");
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch {
        localStorage.removeItem("zunphoto_session");
      }
    }
  }, []);

  const login = (email: string, name?: string) => {
    // Generate unique account ID & transfer code bound to user
    const shortId = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser: UserAccount = {
      id: `USR-${shortId}`,
      email: email,
      name: name || email.split("@")[0],
      role: "VIP_MEMBER",
      balance: 150000,
      transferCode: `ZUN ${shortId}`,
    };
    setUser(newUser);
    localStorage.setItem("zunphoto_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zunphoto_session");
  };

  const updateBalance = (addedAmount: number) => {
    if (!user) return;
    const updated = { ...user, balance: user.balance + addedAmount };
    setUser(updated);
    localStorage.setItem("zunphoto_session", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
