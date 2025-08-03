// app/with-sidebar/dashboard/page.tsx
export const metadata = {
  title: "ダッシュボード | VToolbox",
  description: "あなたの配信・設定・通知を一元管理できるダッシュボードです。",
};

import { DashboardClient } from "./DashboardClient";

export default function DashboardPage() {
  return <DashboardClient />;
}
