// components/SidebarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function SidebarWrapper() {
  const pathname = usePathname();

  // ホーム画面（"/"）では表示しない
  if (pathname === "/") return null;

  return <Sidebar />;
}
