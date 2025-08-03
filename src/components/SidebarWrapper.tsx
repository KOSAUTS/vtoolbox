"use client";
import { Sidebar } from "./Sidebar";

export function SidebarWrapper() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <Sidebar />
    </aside>
  );
}
