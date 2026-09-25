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
  isAdminAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  updateBalance: (newBalance: number) => void;
  deductBalance: (amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdminAuthenticated: false,
  login: () => {},
  logout: () => {},
  adminLogin: () => false,
  adminLogout: () => {},
  updateBalance: () => {},
  deductBalance: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check HttpOnly Cookie session via /api/auth/me
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated && data.user) {
          const shortId = Math.floor(100000 + Math.random() * 900000).toString();
          const activeUser: UserAccount = {
            id: data.user.id || `USR-${shortId}`,
            email: data.user.email,
            name: data.user.email.split("@")[0],
            role: data.user.role || "USER",
            balance: 150000,
            transferCode: `ZUN ${shortId}`,
          };
          setUser(activeUser);
          if (data.user.role === "ADMIN") {
            setIsAdminAuthenticated(true);
          }
        } else {
          // Read saved local session as fallback
          const savedSession = localStorage.getItem("zunphoto_session");
          if (savedSession) {
            try {
              setUser(JSON.parse(savedSession));
            } catch {
              localStorage.removeItem("zunphoto_session");
            }
          }
        }
      })
      .catch(() => {
        const savedSession = localStorage.getItem("zunphoto_session");
        if (savedSession) {
          try {
            setUser(JSON.parse(savedSession));
          } catch {
            localStorage.removeItem("zunphoto_session");
          }
        }
      });

    // Read saved admin session
    const savedAdminSession = localStorage.getItem("zunphoto_admin_session");
    if (savedAdminSession === "authenticated") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Instant Realtime SePAY Balance Auto-Sync Polling
  useEffect(() => {
    if (!user?.transferCode) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sepay/webhook?code=${encodeURIComponent(user.transferCode)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.deposits && data.deposits.length > 0) {
            const processedKey = `processed_tx_${user.transferCode}`;
            const processedIds: string[] = JSON.parse(localStorage.getItem(processedKey) || "[]");

            let newBalanceAdd = 0;
            data.deposits.forEach((tx: { id: string; amount: number }) => {
              if (!processedIds.includes(tx.id)) {
                newBalanceAdd += tx.amount;
                processedIds.push(tx.id);
              }
            });

            if (newBalanceAdd > 0) {
              localStorage.setItem(processedKey, JSON.stringify(processedIds));
              setUser((prev) => {
                if (!prev) return prev;
                const updated = { ...prev, balance: prev.balance + newBalanceAdd };
                localStorage.setItem("zunphoto_session", JSON.stringify(updated));
                return updated;
              });
            }
          }
        }
      } catch {
        // quiet poll
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [user?.transferCode]);

  const login = (email: string, name?: string) => {
    const shortId = Math.floor(100000 + Math.random() * 900000).toString();
    const isAdmin = email.toLowerCase().includes("admin");
    const newUser: UserAccount = {
      id: `USR-${shortId}`,
      email: email,
      name: name || email.split("@")[0],
      role: isAdmin ? "ADMIN" : "VIP_MEMBER",
      balance: 150000,
      transferCode: `ZUN ${shortId}`,
    };
    setUser(newUser);
    if (isAdmin) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("zunphoto_admin_session", "authenticated");
    }
    localStorage.setItem("zunphoto_session", JSON.stringify(newUser));
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore network errors
    }
    setUser(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem("zunphoto_session");
    localStorage.removeItem("zunphoto_admin_session");
  };

  const adminLogin = (passcode: string): boolean => {
    if (passcode === "admin2026" || passcode === "zunphoto@2026" || passcode === "admin") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("zunphoto_admin_session", "authenticated");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("zunphoto_admin_session");
  };

  const updateBalance = (addedAmount: number) => {
    if (!user) return;
    const updated = { ...user, balance: user.balance + addedAmount };
    setUser(updated);
    localStorage.setItem("zunphoto_session", JSON.stringify(updated));
  };

  const deductBalance = (amount: number): boolean => {
    if (!user || user.balance < amount) {
      return false;
    }
    const updated = { ...user, balance: user.balance - amount };
    setUser(updated);
    localStorage.setItem("zunphoto_session", JSON.stringify(updated));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdminAuthenticated,
        login,
        logout,
        adminLogin,
        adminLogout,
        updateBalance,
        deductBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
