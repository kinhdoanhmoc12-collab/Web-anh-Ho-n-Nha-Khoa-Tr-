import fs from "fs";
import path from "path";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  transferCode: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
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
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveUsers(users: UserRecord[]) {
  ensureStoreFile();
  try {
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
    // Return existing user
    if (name && (!users[existingIndex].name || users[existingIndex].name === cleanEmail.split("@")[0])) {
      users[existingIndex].name = name;
      saveUsers(users);
    }
    return users[existingIndex];
  }

  // Create new user with 0 VND balance
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
