import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // パスワードリセット時のページ遷移
      if (data.user && data.user.recovery_sent_at) {
        // トークンをURLフラグメントに付けて確認ページへリダイレクト
        const redirectUrl = new URL(`${origin}/auth/reset-password/confirm`);
        redirectUrl.hash = `access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}&type=recovery`;
        return NextResponse.redirect(redirectUrl);
      }
      // 通常の認証フロー
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // エラーの場合はログインページにリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth_error`);
}
