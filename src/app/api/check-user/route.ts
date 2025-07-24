import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Service Roleキーを使用（環境変数に設定）
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // 注意: これはサーバーサイドでのみ使用
    )

    // ユーザーの存在をチェック
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    })

    // エラーハンドリング
    if (error) {
      return NextResponse.json({ error: 'ユーザーチェック中にエラーが発生しました' }, { status: 500 })
    }

    // メールアドレスが一致するユーザーを検索
    const existingUser = users.users.find(user => user.email === email)

    return NextResponse.json({ exists: !!existingUser })
  } catch {
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
