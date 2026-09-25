// Global Centralized User Store for Realtime Persistence across Web & Admin

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  transferCode: string;
  createdAt: string;
}

const globalStore = globalThis as unknown as {
  __zunphoto_users: UserRecord[];
};

if (!globalStore.__zunphoto_users) {
  globalStore.__zunphoto_users = [
    {
      id: "USR-930392",
      name: "Thành Viên VIP",
      email: "user@zunphoto.pro",
      role: "VIP_MEMBER",
      balance: 150000,
      transferCode: "ZUN 930392",
      createdAt: "2026-09-15",
    },
    {
      id: "USR-889922",
      name: "Minh Anh Photographer",
      email: "minhanh@gmail.com",
      role: "VIP_MEMBER",
      balance: 350000,
      transferCode: "ZUN 889922",
      createdAt: "2026-09-10",
    },
    {
      id: "USR-445511",
      name: "Hoàng Nam Designer",
      email: "hoangnam@gmail.com",
      role: "USER",
      balance: 50000,
      transferCode: "ZUN 445511",
      createdAt: "2026-09-18",
    },
    {
      id: "USR-1001",
      name: "ZunPhoto Admin",
      email: "admin@zunphoto.pro",
      role: "ADMIN",
      balance: 10000000,
      transferCode: "ZUN 100001",
      createdAt: "2026-01-01",
    },
  ];
}

export function getAllUsers(): UserRecord[] {
  return globalStore.__zunphoto_users;
}

export function registerUser(email: string, name?: string): UserRecord {
  const existing = globalStore.__zunphoto_users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return existing;
  }

  const numCode = Math.floor(100000 + Math.random() * 900000);
  const newUser: UserRecord = {
    id: `USR-${numCode}`,
    name: name || email.split("@")[0],
    email,
    role: email.toLowerCase().includes("admin") ? "ADMIN" : "VIP_MEMBER",
    balance: 150000,
    transferCode: `ZUN ${numCode}`,
    createdAt: new Date().toISOString().split("T")[0],
  };

  globalStore.__zunphoto_users.unshift(newUser);
  return newUser;
}

export function updateUser(id: string, updates: Partial<Omit<UserRecord, "id">>): UserRecord | null {
  const idx = globalStore.__zunphoto_users.findIndex((u) => u.id === id);
  if (idx === -1) return null;

  globalStore.__zunphoto_users[idx] = {
    ...globalStore.__zunphoto_users[idx],
    ...updates,
  };
  return globalStore.__zunphoto_users[idx];
}

export function deleteUser(id: string): boolean {
  const initialLen = globalStore.__zunphoto_users.length;
  globalStore.__zunphoto_users = globalStore.__zunphoto_users.filter((u) => u.id !== id);
  return globalStore.__zunphoto_users.length < initialLen;
}

export function updateUserBalanceByTransferCode(transferCode: string, addedAmount: number): boolean {
  const cleanTarget = transferCode.replaceAll(" ", "").toUpperCase();
  const user = globalStore.__zunphoto_users.find(
    (u) => u.transferCode.replaceAll(" ", "").toUpperCase() === cleanTarget
  );

  if (user) {
    user.balance += addedAmount;
    return true;
  }
  return false;
}
