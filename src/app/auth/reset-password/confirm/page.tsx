"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function ResetPasswordConfirmPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const supabase = createClient();

  useEffect(() => {
    // URLフラグメントからトークンを取得する関数
    const getTokenFromUrl = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      return {
        access_token: hashParams.get("access_token"),
        refresh_token: hashParams.get("refresh_token"),
        type: hashParams.get("type"),
      };
    };

    // URLパラメータまたはフラグメントからトークンを取得
    let accessToken = searchParams.get("access_token");
    let refreshToken = searchParams.get("refresh_token");
    let type = searchParams.get("type");

    // フラグメントからも確認
    if (!accessToken) {
      const tokens = getTokenFromUrl();
      accessToken = tokens.access_token;
      refreshToken = tokens.refresh_token;
      type = tokens.type;
    }

    if (accessToken && refreshToken && type === "recovery") {
      // セッションを設定
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ error }) => {
          if (error) {
            setError("セッションの設定に失敗しました");
          } else {
            setIsValidSession(true);
          }
        });
    } else {
      setError("無効なリセットリンクです");
    }
  }, [searchParams, supabase]);

  // パスワード更新処理
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // 入力チェック
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Supabaseを使用してパスワードを更新
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      // エラーハンドリング
      if (error) {
        setError("パスワードの更新に失敗しました: " + error.message);
      } else {
        setMessage(
          "パスワードが正常に更新されました\nログインページに移動します"
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch {
      setError("予期しないエラーが発生しました");
    }

    // ローディング状態をリセット
    setLoading(false);
  };

  // セッションが無効な場合の表示
  if (!isValidSession && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">読み込み中...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>新しいパスワードの設定</CardTitle>
          <CardDescription>新しいパスワードを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm border border-green-200">
              {message}
            </div>
          )}
          {error && !isValidSession ? (
            <div className="text-center">
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => router.push("/password-reset")}
                variant="outline"
              >
                パスワードリセットページに戻る
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <Input
                type="password"
                placeholder="新しいパスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="パスワード確認"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "更新中..." : "パスワードを更新"}
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
