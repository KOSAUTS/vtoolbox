// app/(with-sidebar)/layout.tsx
import { SidebarWrapper } from "@/components/SidebarWrapper";

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarWrapper />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
