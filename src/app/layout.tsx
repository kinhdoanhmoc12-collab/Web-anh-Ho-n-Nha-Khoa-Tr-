import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0284c7",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zunphoto.vn"),
  title: {
    default: "ZunPhoto | Nhiếp Ảnh Gia, Stock RAW Free & Preset Lightroom",
    template: "%s | ZunPhoto",
  },
  description: "Trang web chính thức của ZunPhoto - Nền tảng chia sẻ Stock ảnh RAW chất lượng cao, Preset Lightroom miễn phí, Khóa học nhiếp ảnh và tài nguyên đồ họa chuyên nghiệp.",
  keywords: [
    "ZunPhoto",
    "Stock RAW Free",
    "Preset Lightroom Free",
    "Blend màu Photoshop",
    "Nhiếp ảnh chân dung",
    "Khóa học nhiếp ảnh",
    "Stock ảnh chân dung",
    "Preset màu Hàn Quốc",
    "Retouch da chuyên nghiệp",
    "Tài nguyên nhiếp ảnh",
  ],
  authors: [{ name: "ZunPhoto", url: "https://zunphoto.vn" }],
  creator: "ZunPhoto",
  publisher: "ZunPhoto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://zunphoto.vn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://zunphoto.vn",
    siteName: "ZunPhoto Platform",
    title: "ZunPhoto | Nhiếp Ảnh Gia, Stock RAW Free & Preset Lightroom",
    description: "Trang web chính thức của ZunPhoto - Chia sẻ Stock RAW, Preset Free, Khóa học và Tài nguyên nhiếp ảnh chuyên nghiệp.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "ZunPhoto Photography & Presets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZunPhoto | Nhiếp Ảnh Gia, Stock RAW Free & Preset Lightroom",
    description: "Chia sẻ Stock RAW, Preset Free, Khóa học và Tài nguyên nhiếp ảnh chuyên nghiệp.",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZunPhoto",
  url: "https://zunphoto.vn",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zunphoto.vn/category/stock-free?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZunPhoto",
  url: "https://zunphoto.vn",
  logo: "https://zunphoto.vn/avatar.jpg",
  sameAs: [
    "https://www.tiktok.com/@zunphoto",
    "https://www.facebook.com/",
    "https://www.instagram.com/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} light scroll-smooth h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className={`${inter.className} min-h-full bg-[#edf3f8] text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
