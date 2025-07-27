import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // リクエストのヘッダーを保持するためのNextResponseオブジェクトを作成
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Supabaseのサーバーサイドクライアントを作成
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // リクエストからCookieを取得
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // ユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 保護されたルートのパスを定義
  const protectedPaths = ['/dashboard', '/profile', '/settings']
  const authPaths = ['/login', '/signup']
  const currentPath = request.nextUrl.pathname

  // 認証が必要なページでユーザーがログインしていない場合
  if (protectedPaths.some(path => currentPath.startsWith(path)) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ログイン済みユーザーが認証ページにアクセスした場合、ホームにリダイレクト
  if (authPaths.includes(currentPath) && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

// このミドルウェアは、Next.jsのルーティングに基づいてリクエストを処理
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
