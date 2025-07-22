"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // reCAPTCHAの変更ハンドラー
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  // メールアドレスとパスワードでのログイン処理
  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

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

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken: recaptchaToken,
        },
      });

      if (signInError) {
        setError(signInError.message);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        router.push("/");
        router.refresh();
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

  // Twitter OAuthでのログイン処理
  const handleTwitterLogin = async () => {
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
      }
    } catch (catchError: unknown) {
      setError(
        catchError instanceof Error
          ? catchError.message
          : "予期せぬエラーが発生しました"
      );
    } finally {
      if (error) setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            ログイン
          </CardTitle>
          <CardDescription className="text-center">
            アカウントにログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm whitespace-pre-line">
              {error}
            </div>
          )}
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
              {loading ? "処理中..." : "メールアドレスでログイン"}
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
            onClick={handleTwitterLogin}
            disabled={loading}
          >
            <RiTwitterXFill className="mr-2 h-4 w-4" />
            {loading ? "処理中..." : "X (旧Twitter)でログイン"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p>
            アカウントをお持ちでないですか？
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              アカウント作成
            </Link>
          </p>
          <Link
            href="/password-reset"
            className="font-medium text-primary hover:underline"
          >
            パスワードをお忘れですか？
          </Link>
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
        </CardFooter>
      </Card>
    </div>
  );
}
