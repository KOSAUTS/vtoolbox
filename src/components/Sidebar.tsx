"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-100 border-r p-4 fixed top-0 left-0 flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold">ようこそ！</h2>
        <Button asChild variant="link" size="sm">
          <Link href="/settings">設定ページへ</Link>
        </Button>
      </div>
      <nav className="flex flex-col gap-3">
        <Button asChild variant="link" size="sm">
          <Link href="/home">ホーム</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/pricing">料金</Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link href="/promotion">プロモーション</Link>
        </Button>
      </nav>
    </aside>
  );
}
