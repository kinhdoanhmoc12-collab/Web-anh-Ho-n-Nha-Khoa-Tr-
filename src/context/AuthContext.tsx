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
  refreshUserSession: () => Promise<void>;
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
  refreshUserSession: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const fetchCurrentSession = async () => {
    // 1. First try /api/auth/me (cookie session)
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data?.authenticated && data.user) {
          const activeUser: UserAccount = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.email.split("@")[0],
            role: data.user.role || "USER",
            balance: typeof data.user.balance === "number" ? data.user.balance : 0,
            transferCode: data.user.transferCode || `ZUN ${data.user.id.replace("USR-", "")}`,
          };
          setUser(activeUser);
          localStorage.setItem("zunphoto_session", JSON.stringify(activeUser));
          if (data.user.role === "ADMIN") {
            setIsAdminAuthenticated(true);
          }
          return;
        }
      }
    } catch {
      // quiet catch
    }

    // 2. Read saved local session and sync with backend data/users.json
    const savedSession = localStorage.getItem("zunphoto_session");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);

        // Synchronize with server UserStore using email or transferCode or id
        const usersRes = await fetch("/api/admin/users");
        if (usersRes.ok) {
          const data = await usersRes.json();
          if (data?.users && Array.isArray(data.users)) {
            const found = data.users.find(
              (u: { email: string; id: string; transferCode: string }) =>
                (parsed.email && u.email.toLowerCase() === parsed.email.toLowerCase()) ||
                (parsed.transferCode && u.transferCode?.replaceAll(" ", "").toUpperCase() === parsed.transferCode?.replaceAll(" ", "").toUpperCase()) ||
                (parsed.id && u.id === parsed.id)
            );

            if (found) {
              const updatedUser: UserAccount = {
                id: found.id,
                email: found.email,
                name: found.name || parsed.name,
                role: found.role || "USER",
                balance: typeof found.balance === "number" ? found.balance : 0,
                transferCode: found.transferCode || parsed.transferCode,
              };
              setUser(updatedUser);
              localStorage.setItem("zunphoto_session", JSON.stringify(updatedUser));
            }
          }
        }
      } catch {
        localStorage.removeItem("zunphoto_session");
      }
    }
  };

  useEffect(() => {
    fetchCurrentSession();

    // Read saved admin session
    const savedAdminSession = localStorage.getItem("zunphoto_admin_session");
    if (savedAdminSession === "authenticated") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // 100% Realtime Synchronized Session & Balance Polling (Every 3s)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchCurrentSession();
    }, 3000);

    return () => clearInterval(interval);
  }, [user?.email, user?.transferCode]);

  const login = async (email: string, name?: string) => {
    const isAdmin = email.toLowerCase().includes("admin");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const activeUser: UserAccount = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            balance: data.user.balance || 0,
            transferCode: data.user.transferCode,
          };
          setUser(activeUser);
          if (data.user.role === "ADMIN") {
            setIsAdminAuthenticated(true);
            localStorage.setItem("zunphoto_admin_session", "authenticated");
          }
          localStorage.setItem("zunphoto_session", JSON.stringify(activeUser));
          return;
        }
      }
    } catch {
      // fallback
    }

    const shortId = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser: UserAccount = {
      id: `USR-${shortId}`,
      email: email,
      name: name || email.split("@")[0],
      role: isAdmin ? "ADMIN" : "USER",
      balance: 0,
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
    const newBal = user.balance + addedAmount;
    const updated = { ...user, balance: newBal };
    setUser(updated);
    localStorage.setItem("zunphoto_session", JSON.stringify(updated));

    // Sync to backend UserStore (fire & forget)
    fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        balance: newBal,
      }),
    }).catch(() => {});
  };

  const deductBalance = (amount: number): boolean => {
    if (!user || user.balance < amount) {
      return false;
    }
    const newBal = user.balance - amount;
    const updated = { ...user, balance: newBal };
    setUser(updated);
    localStorage.setItem("zunphoto_session", JSON.stringify(updated));

    // Sync to backend UserStore (fire & forget)
    fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        balance: newBal,
      }),
    }).catch(() => {});

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
        refreshUserSession: fetchCurrentSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
