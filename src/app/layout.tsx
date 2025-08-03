// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";

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

// withSidebar フラグを layout-level context 経由で渡す
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
        {children}
      </body>
    </html>
  );
}
