// Database Interface Layer (Prisma ORM Adapter)

export interface UserRecord {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  role: "GUEST" | "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
}

export interface ResourceRecord {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  fileUrl?: string;
  type: "STOCK_FREE" | "PRESET_FREE" | "PAID_RESOURCE" | "COURSE";
  price: number;
  viewsCount: number;
  downloadCount: number;
}

class MockPrismaClient {
  user = {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email === "test@zunphoto.pro") {
        return {
          id: "usr_123",
          email: "test@zunphoto.pro",
          name: "Test User",
          passwordHash: "$2a$10$abcdefghijklmnopqrstuu",
          role: "VIP_MEMBER" as const,
          balance: 100000,
        };
      }
      return null;
    },
    create: async ({ data }: { data: { email: string; name?: string; passwordHash: string } }) => {
      return {
        id: `usr_${Date.now()}`,
        email: data.email,
        name: data.name || "Member",
        passwordHash: data.passwordHash,
        role: "USER" as const,
        balance: 0,
      };
    },
  };

  resource = {
    findMany: async () => {
      return [
        {
          id: "res_1",
          title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn)",
          slug: "stock-nang-chieu",
          type: "STOCK_FREE" as const,
          price: 0,
          viewsCount: 12400,
          downloadCount: 4800,
          imageUrl: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
        },
      ];
    },
  };
}

const globalForPrisma = globalThis as unknown as {
  prisma: MockPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new MockPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
