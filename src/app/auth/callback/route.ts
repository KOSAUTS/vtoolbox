import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'; // サーバーサイド用のSupabaseクライアント

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url); // リクエストのURLから検索パラメータとオリジンを取得
  const code = searchParams.get('code'); // `code` パラメータを取得
  const next = searchParams.get('next') ?? '/dashboard'; // `next` パラメータが存在しない場合は、デフォルトでダッシュボードにリダイレクト

  if (code) {
    const supabase = await createClient(); // Supabaseクライアントを作成
    const { error } = await supabase.auth.exchangeCodeForSession(code); // 認証コードをセッションに交換

    // 認証コードの交換が成功した場合、指定された `next` パスにリダイレクト
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 認証コードが無効または存在しない場合、エラーページにリダイレクト
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
