"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// SWR Mutation用のfetcher関数
async function checkUserFetcher(
  url: string,
  { arg }: { arg: { email: string } }
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const result = await response.json();

  if (!response.ok) {
    // APIからのエラーメッセージをスローする
    throw new Error(result.error || "ユーザーの確認に失敗しました");
  }

  return result;
}

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  // useSWRMutationを使用してAPI通信をセットアップ
  const { trigger, isMutating } = useSWRMutation(
    "/api/check-user",
    checkUserFetcher
  );

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // trigger関数でAPIを呼び出す
      const checkResult = await trigger({ email });

      if (checkResult.exists) {
        // ユーザーが存在する場合、パスワードリセットメールを送信
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            // リセット後のリダイレクトURLを設定
            redirectTo: `${window.location.origin}/auth/callback`,
          }
        );

        if (resetError) {
          setError("リセットメールの送信に失敗しました");
        } else {
          setMessage(
            "パスワードリセット用のメールを送信しました\nメールをご確認ください"
          );
        }
      } else {
        setError("このメールアドレスは登録されていません");
      }
    } catch (err: unknown) {
      // fetcherからスローされたエラーをキャッチ
      if (err instanceof Error) {
        setError(err.message || "予期しないエラーが発生しました");
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>パスワードリセット</CardTitle>
          <CardDescription>
            登録済みのメールアドレスを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* isMutatingでローディング状態を管理 */}
            <Button type="submit" className="w-full" disabled={isMutating}>
              {isMutating ? "送信中..." : "リセットメールを送信"}
            </Button>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
