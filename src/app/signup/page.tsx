"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";

export default function SignUpPage() {
  const supabase = createClient();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // reCAPTCHAの変更ハンドラー
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  // メールアドレスでの新規登録処理
  const handleEmailSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    // reCAPTCHAの検証
    if (!recaptchaToken) {
      setError("reCAPTCHAを完了してください");
      return;
    }

    setLoading(true);
    try {
      // サーバーサイドでreCAPTCHAを検証
      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        setError("reCAPTCHA検証に失敗しました\nもう一度お試しください");
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      // 事前にユーザーの存在をチェック
      const checkResponse = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const checkResult = await checkResponse.json();

      if (checkResult.exists) {
        setError(
          "このメールアドレスは既に登録されています\nログインページからログインしてください"
        );
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      // ユーザーが存在しない場合のみサインアップを実行
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          captchaToken: recaptchaToken,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        setMessage(
          "確認メールを送信しました！\nメールのリンクをクリックして登録を完了してください"
        );
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRecaptchaToken(null);
      }
    } catch (catchError: unknown) {
      setError(
        catchError instanceof Error
          ? catchError.message
          : "予期せぬエラーが発生しました"
      );
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Twitterでの新規登録処理
  const handleTwitterSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setLoading(false);
      }
    } catch (catchError: unknown) {
      setError(
        catchError instanceof Error
          ? catchError.message
          : "予期せぬエラーが発生しました"
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            アカウント作成
          </CardTitle>
          <CardDescription className="text-center">
            新しいアカウントを作成します
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm whitespace-pre-line">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm border border-green-200 whitespace-pre-line">
              {message}
            </div>
          )}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">パスワード（確認用）</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* reCAPTCHAを追加 */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleRecaptchaChange}
                onExpired={() => setRecaptchaToken(null)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !recaptchaToken}
            >
              <Mail className="mr-2 h-4 w-4" />
              {loading ? "処理中..." : "メールアドレスで登録"}
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="mx-4 text-xs text-muted-foreground">または</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleTwitterSignUp}
            disabled={loading}
          >
            <RiTwitterXFill className="mr-2 h-4 w-4" />
            {loading ? "処理中..." : "X (旧Twitter)で登録"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p>
            すでにアカウントをお持ちですか？
            <Link
              href="/login"
              className="font-medium text-primary hover:underline ml-2"
            >
              ログイン
            </Link>
          </p>
          <div className="flex space-x-4 mt-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-primary hover:underline">
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary hover:underline"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            アカウントを作成することで
            <Link href="/terms" className="hover:text-primary hover:underline">
              利用規約
            </Link>
            と
            <Link
              href="/privacy"
              className="hover:text-primary hover:underline"
            >
              プライバシーポリシー
            </Link>
            に同意したものとみなします
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
