import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    // 1. 프론트엔드에서 넘어오는 부지 형태(type) 변수를 추가로 받아옵니다.
    const { name, phone, type, content } = body;

    // 2. 확인된 진짜 대구지사 그룹방 ID 및 봇 토큰 강제 고정
    const BOT_TOKEN = '8774928836:AAHL2aBueQvlhVk2-N6lbRqTANkwFeX9hk8'; 
    const REAL_CHAT_ID = '-1003994233094'; 

    // 3. 메시지 포맷 구성 ('부지형태' 항목 추가 완료)
    const message = `
📢 [KS에너지 대구지사] 새 상담 신청
- 성함: ${name}
- 연락처: ${phone}
- 부지형태: ${type || '선택 안 함'}
- 문의내용: ${content || '없음'}
    `.trim();

    // 4. 텔레그램 API 발송 주소
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    // 5. 발송 처리 (REAL_CHAT_ID를 문자열로 정확하게 매칭)
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