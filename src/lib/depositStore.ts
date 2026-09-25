// Global Deposit & Transaction Store for SePAY Instant Auto-Approval

export interface DepositRecord {
  id: string;
  memoCode: string;
  userEmail?: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "APPROVED"; // Always APPROVED automatically
  createdAt: string;
  referenceCode?: string;
}

// Global in-memory storage (persisted across requests during server runtime)
const globalStore = globalThis as unknown as {
  __sepay_deposits: DepositRecord[];
};

if (!globalStore.__sepay_deposits) {
  globalStore.__sepay_deposits = [
    {
      id: "TX-9901",
      memoCode: "ZUN 889922",
      userEmail: "minhanh@gmail.com",
      amount: 200000,
      bankName: "MB Bank",
      accountNumber: "0979487405",
      status: "APPROVED",
      createdAt: "2026-09-19 17:15:30",
    },
    {
      id: "TX-9902",
      memoCode: "ZUN 930392",
      userEmail: "hoangnam@gmail.com",
      amount: 500000,
      bankName: "MB Bank",
      accountNumber: "0979487405",
      status: "APPROVED",
      createdAt: "2026-09-19 17:10:00",
    },
  ];
}

export function getDeposits(): DepositRecord[] {
  return globalStore.__sepay_deposits;
}

export function addDeposit(record: Omit<DepositRecord, "id" | "status" | "createdAt">): DepositRecord {
  const newRecord: DepositRecord = {
    ...record,
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    status: "APPROVED",
    createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
  };
  globalStore.__sepay_deposits.unshift(newRecord);
  return newRecord;
}
