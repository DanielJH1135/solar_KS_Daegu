import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, content } = body;

    // 1. 대구지사 텔레그램 그룹방 ID 및 봇 토큰 설정
    const BOT_TOKEN = '8774928836:AAHL2aBueQvlhVk2-N6lbRqTANkwFeX9hk8'; // 여기에 기존 봇 토큰을 그대로 넣어주세요!
    const CHAT_ID = '-1002235252874'; // 대구지사 그룹방 ID 반영 완료

    // 2. 텔레그램으로 보낼 메시지 포맷 구성
    const message = `
📢 [KS에너지 대구지사] 새 상담 신청
- 성함: ${name}
- 연락처: ${phone}
- 문의내용: ${content || '없음'}
    `.trim();

    // 3. 텔레그램 API 호출 (반드시 CHAT_ID 변수를 사용하도록 고정)
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID, // 이 부분이 사장님 개인 ID 변수로 되어있었을 확률이 높습니다!
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('텔레그램 전송 실패:', errorData);
      return NextResponse.json({ success: false, error: '텔레그램 전송 실패' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('서버 에러:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}