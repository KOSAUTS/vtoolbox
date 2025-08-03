// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "@/components/SidebarWrapper"; // ✅ 追加

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "配信をもっとカンタンに | VToolbox",
  description:
    "VTuberの配信をもっと楽しく、もっとスムーズに。VToolboxは、配信演出・レイアウト・チャット表示など、配信を支える便利機能が揃ったサポートツールです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <SidebarWrapper /> {/* ✅ クライアント側でパスによって表示切替 */}
          <main className="flex-1 min-h-screen ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
