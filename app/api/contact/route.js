import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, type, content } = body;

    // ==========================================
    // 1. 환경 설정 (텔레그램 및 구글 앱스 스크립트 고정)
    // ==========================================
    // .env.local 또는 서버 환경변수에서 안전하게 값을 꺼내옵니다.
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGmWhWy2-iaZFJTxLeRcEKS1Ynunqb_7Plz-OtPtDI2Zo6QUbAeSB1STSdSLQHPgA/exec';

    // ==========================================
    // 2. 텔레그램 알림톡 발송 처리
    // ==========================================
    const message = `
📢 [KS에너지 대구지사] 새 상담 신청
- 성함: ${name}
- 연락처: ${phone}
- 부지형태: ${type || '선택 안 함'}
- 문의내용: ${content || '없음'}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    // 비동기로 텔레그램 발송
    const telegramPromise = fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: REAL_CHAT_ID,
        text: message,
      }),
    });

    // ==========================================
    // 3. 구글 스프레드시트(Apps Script) 적재 처리
    // ==========================================
    const googleSheetsPromise = fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        phone: phone,
        type: type || '선택 안 함',
        content: content || '없음'
      }),
    });

    // 두 개의 요청을 동시에 실행하여 속도 최적화
    const [teleRes, sheetRes] = await Promise.all([telegramPromise, googleSheetsPromise]);

    // 텔레그램 로그 확인
    if (!teleRes.ok) {
      const errorData = await teleRes.json();
      console.error('텔레그램 전송 실패 원인:', errorData);
    }
    
    // 구글 시트 로그 확인
    if (!sheetRes.ok) {
      console.error('구글 시트 전송 실패');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('서버 내부 에러:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}