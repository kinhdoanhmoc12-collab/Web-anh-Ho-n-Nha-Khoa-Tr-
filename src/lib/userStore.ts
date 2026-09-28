import fs from "fs";
import path from "path";
import { createSnapshotBackup } from "./backupStore";

export interface PurchasedItem {
  id: string;
  postId: string;
  postTitle: string;
  postSlug: string;
  category: string;
  price: string;
  purchasedAt: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  transferCode: string;
  createdAt: string;
  purchasedItems?: PurchasedItem[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

const defaultUsers: UserRecord[] = [
  {
    id: "USR-312254",
    name: "Thành viên VIP",
    email: "user@zunphoto.pro",
    role: "VIP_MEMBER",
    balance: 200000,
    transferCode: "ZUN 312254",
    createdAt: "2026-09-26",
    purchasedItems: [
      {
        id: "ORD-992102",
        postId: "P-962",
        postTitle: "Bộ preset chân dung 2026",
        postSlug: "bo-preset-chan-dung-2026",
        category: "Tài nguyên trả phí",
        price: "299.000đ",
        purchasedAt: "2026-09-28 14:20:00",
      },
    ],
  },
  {
    id: "USR-1001",
    name: "ZunPhoto Admin",
    email: "admin@zunphoto.pro",
    role: "ADMIN",
    balance: 0,
    transferCode: "ZUN 1001",
    createdAt: "2026-01-01",
    purchasedItems: [],
  },
];

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultUsers, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Error creating data folder/file:", e);
  }
}

export function getAllUsers(): UserRecord[] {
  ensureStoreFile();
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((u, index) => ({
        id: u?.id || `USR-${1000 + index}`,
        name: u?.name || u?.email?.split("@")[0] || "Thành viên",
        email: u?.email || "user@zunphoto.pro",
        role: u?.role || "USER",
        balance: typeof u?.balance === "number" ? u.balance : 0,
        transferCode: u?.transferCode || `ZUN ${100000 + index}`,
        createdAt: u?.createdAt || new Date().toISOString().split("T")[0],
        purchasedItems: Array.isArray(u?.purchasedItems) ? u.purchasedItems : [],
      }));
    }
    return defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function saveUsers(users: UserRecord[]) {
  ensureStoreFile();
  try {
    createSnapshotBackup("users_update");
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing users JSON:", err);
  }
}

export function registerUser(email: string, name?: string, transferCodeOverride?: string): UserRecord {
  const users = getAllUsers();
  const cleanEmail = email.trim().toLowerCase();

  const existingIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (existingIndex !== -1) {
    if (name && (!users[existingIndex].name || users[existingIndex].name === cleanEmail.split("@")[0])) {
      users[existingIndex].name = name;
      saveUsers(users);
    }
    return users[existingIndex];
  }

  const numCode = Math.floor(100000 + Math.random() * 900000);
  const transferCode = transferCodeOverride || `ZUN ${numCode}`;

  const newUser: UserRecord = {
    id: `USR-${numCode}`,
    name: name || cleanEmail.split("@")[0],
    email: cleanEmail,
    role: cleanEmail.includes("admin") ? "ADMIN" : "USER",
    balance: 0,
    transferCode,
    createdAt: new Date().toISOString().split("T")[0],
    purchasedItems: [],
  };

  users.unshift(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<Omit<UserRecord, "id">>): UserRecord | null {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;

  users[idx] = {
    ...users[idx],
    ...updates,
  };

  saveUsers(users);
  return users[idx];
}

export function deleteUser(id: string): boolean {
  let users = getAllUsers();
  const initialLen = users.length;
  users = users.filter((u) => u.id !== id);
  saveUsers(users);
  return users.length < initialLen;
}

export function updateUserBalanceByTransferCode(transferCode: string, addedAmount: number): boolean {
  const users = getAllUsers();
  const cleanTarget = transferCode.replaceAll(" ", "").toUpperCase();
  const user = users.find(
    (u) => u.transferCode.replaceAll(" ", "").toUpperCase() === cleanTarget
  );

  if (user) {
    user.balance += addedAmount;
    saveUsers(users);
    return true;
  }
  return false;
}

export function recordUserPurchase(
  userIdOrEmail: string,
  item: {
    postId: string;
    postTitle: string;
    postSlug: string;
    category?: string;
    price?: string;
  }
): boolean {
  const users = getAllUsers();
  const cleanKey = userIdOrEmail.trim().toLowerCase();

  const user = users.find(
    (u) => u.id.toLowerCase() === cleanKey || u.email.toLowerCase() === cleanKey
  );

  if (!user) return false;

  if (!Array.isArray(user.purchasedItems)) {
    user.purchasedItems = [];
  }

  // Check if already recorded
  const alreadyPurchased = user.purchasedItems.some(
    (p) => p.postId === item.postId || p.postSlug === item.postSlug
  );

  if (!alreadyPurchased) {
    const purchaseRecord: PurchasedItem = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      postId: item.postId,
      postTitle: item.postTitle,
      postSlug: item.postSlug,
      category: item.category || "Tài nguyên",
      price: item.price || "0đ",
      purchasedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
    };

    user.purchasedItems.unshift(purchaseRecord);
    saveUsers(users);
  }

  return true;
}
