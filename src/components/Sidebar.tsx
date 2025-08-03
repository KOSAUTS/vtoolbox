"use client";

import { usePathname } from "next/navigation";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { Home, Settings, LayoutDashboard } from "lucide-react";
import clsx from "clsx";

type User = {
  name: string;
  avatarUrl: string;
  subscription: "free" | "basic" | "premium";
};

const dummyUser: User = {
  name: "Test",
  avatarUrl: "/images/avatar.png",
  subscription: "basic",
};

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/login") return null;

  return (
    <aside className="w-64 min-h-screen border-r bg-white px-4 py-6 flex flex-col justify-between fixed top-0 left-0">
      {/* 上部：ユーザー情報とメニュー */}
      <div>
        {/* ユーザー情報 */}
        <div className="flex flex-col items-center mb-4">
          <UserAvatar
            avatarUrl={dummyUser.avatarUrl}
            subscription={dummyUser.subscription}
            size="md"
          />
          <p className="mt-2 font-semibold">{dummyUser.name}</p>
        </div>

        {/* 境界線 */}
        <div className="border-t border-gray-400 my-4" />

        {/* メニューリンク */}
        <nav className="space-y-4 text-sm">
          <Link
            href="/dashboard"
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              pathname.startsWith("/dashboard")
                ? "bg-gray-100 text-gray-800 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            ダッシュボード
          </Link>

          <Link
            href="/stream"
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              pathname.startsWith("/stream")
                ? "bg-gray-100 text-gray-800 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            )}
          >
            <Home className="w-4 h-4" />
            配信ページ
          </Link>
        </nav>
      </div>

      {/* 下部：設定リンク（上にボーダー追加） */}
      <div className="border-t border-gray-400 pt-4 mt-8">
        <Link
          href="/settings"
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
            pathname.startsWith("/settings")
              ? "bg-gray-100 text-gray-800 font-semibold"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          )}
        >
          <Settings className="w-4 h-4" />
          設定
        </Link>
      </div>
    </aside>
  );
}
