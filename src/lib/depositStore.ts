import fs from "fs";
import path from "path";

export interface DepositRecord {
  id: string;
  memoCode: string;
  userEmail?: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  referenceCode?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "transactions.json");

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Error creating transactions folder/file:", e);
  }
}

export function getDeposits(): DepositRecord[] {
  ensureStoreFile();
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.map((d, index) => ({
        id: d?.id || `TX-${1000 + index}`,
        memoCode: d?.memoCode || "ZUN 888888",
        userEmail: d?.userEmail || "user@zunphoto.pro",
        amount: typeof d?.amount === "number" ? d.amount : 0,
        bankName: d?.bankName || "MB Bank",
        accountNumber: d?.accountNumber || "0979487405",
        status: d?.status || "APPROVED",
        createdAt: d?.createdAt || new Date().toISOString().replace("T", " ").slice(0, 19),
        referenceCode: d?.referenceCode || "",
      }));
    }
    return [];
  } catch {
    return [];
  }
}

function saveDeposits(deposits: DepositRecord[]) {
  ensureStoreFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(deposits, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing transactions JSON:", err);
  }
}

export function addDeposit(record: Omit<DepositRecord, "id" | "status" | "createdAt"> & { status?: "APPROVED" | "PENDING" | "REJECTED" }): DepositRecord {
  const deposits = getDeposits();
  const newRecord: DepositRecord = {
    ...record,
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    status: record.status || "APPROVED",
    createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
  };
  deposits.unshift(newRecord);
  saveDeposits(deposits);
  return newRecord;
}

export function updateDeposit(id: string, updates: Partial<Omit<DepositRecord, "id">>): DepositRecord | null {
  const deposits = getDeposits();
  const idx = deposits.findIndex((d) => d.id === id);
  if (idx === -1) return null;

  deposits[idx] = {
    ...deposits[idx],
    ...updates,
  };
  saveDeposits(deposits);
  return deposits[idx];
}

export function deleteDeposit(id: string): boolean {
  let deposits = getDeposits();
  const initialLen = deposits.length;
  deposits = deposits.filter((d) => d.id !== id);
  saveDeposits(deposits);
  return deposits.length < initialLen;
}
