import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // トークンが提供されていない場合のエラーハンドリング
    if (!token) {
      return NextResponse.json({ success: false, error: 'トークンが提供されていません' }, { status: 400 });
    }

    // Google reCAPTCHA APIで検証
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const result = await response.json(); // レスポンスをJSONとして解析

    // reCAPTCHAの検証結果を確認
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'reCAPTCHA検証に失敗しました' }, { status: 400 });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({ success: false, error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
