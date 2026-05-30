import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, content } = body;

    // 1. 확인된 진짜 대구지사 그룹방 ID 및 봇 토큰 강제 고정
    const BOT_TOKEN = '8774928836:AAHL2aBueQvlhVk2-N6lbRqTANkwFeX9hk8'; // 사장님의 기존 진짜 봇 토큰을 적어주세요!
    const REAL_CHAT_ID = '-5180379766'; // 텔레그램 로그로 교차 검증 완료된 진짜 ID

    // 2. 메시지 포맷 구성
    const message = `
📢 [KS에너지 대구지사] 새 상담 신청
- 성함: ${name}
- 연락처: ${phone}
- 문의내용: ${content || '없음'}
    `.trim();

    // 3. 텔레그램 API 발송 주소
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    // 4. 발송 처리 (REAL_CHAT_ID를 문자열로 정확하게 매칭)
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: REAL_CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('텔레그램 전송 실패 원인:', errorData);
      return NextResponse.json({ success: false, error: '텔레그램 전송 실패' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('서버 내부 에러:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}