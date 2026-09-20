import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZunPhoto | Photography & Digital Media Portfolio",
  description: "Trang web chính thức của ZunPhoto - Nhiếp ảnh gia, Chia sẻ Stock, Preset Free, Khóa học và Tài nguyên nhiếp ảnh chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
