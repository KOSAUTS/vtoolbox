"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserAvatar } from "@/components/UserAvatar";
import { X, Bell, Mail, User } from "lucide-react";
import Link from "next/link";

export function DashboardClient() {
  const [showProfileAlert, setShowProfileAlert] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<null | {
    id: number;
    title: string;
    content: string;
  }>(null);

  const messages = [
    {
      id: 1,
      title: "アップデートのお知らせ",
      content: "新機能が追加されました！詳細はこちらをご覧ください。",
      isNew: true,
    },
    {
      id: 2,
      title: "今月の機能改善報告",
      content: "いくつかの不具合を修正し、パフォーマンスを改善しました。",
      isNew: false,
    },
  ];

  const user = {
    name: "Test",
    avatarUrl: "/images/avatar.png",
    subscription: "プレミアムプラン",
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* アラート */}
      {showProfileAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-md p-4 pr-10"
        >
          <div className="flex items-start">
            <Bell className="w-5 h-5 mr-2 mt-0.5 text-yellow-600" />
            <div className="text-sm">
              プロフィールが未設定です。{" "}
              <Link href="/settings" className="text-blue-600 underline">
                こちらから設定
              </Link>
            </div>
          </div>
          <button
            onClick={() => setShowProfileAlert(false)}
            className="absolute top-2 right-2 text-yellow-600 hover:text-yellow-800"
            aria-label="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* メッセージ一覧 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            運営からのお知らせ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition"
                onClick={() => setSelectedMessage(msg)}
              >
                <span>{msg.title}</span>
                {msg.isNew && <Badge variant="default">New</Badge>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ダイアログ（モーダル） */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMessage?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">{selectedMessage?.content}</p>
        </DialogContent>
      </Dialog>

      {/* プロフィール */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            プロフィール情報
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            subscription="premium"
            size="md"
          />
          <div>
            <div className="font-semibold text-lg">{user.name}</div>
            <div className="text-sm text-gray-500">
              プラン: {user.subscription}
            </div>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="mt-2">
                プロフィールを編集
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
