import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // 環境変数からSupabaseのURLとanonキーを取得
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
