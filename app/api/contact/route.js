import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, phone, type, content } = await request.json();

    const TELEGRAM_BOT_TOKEN = '8774928836:AAHL2aBueQvlhVk2-N6lbRqTANkwFeX9hk8'; 
    const TELEGRAM_CHAT_ID = '-1002235252874'; 

    // 💡 백틱(`) 기호가 정확히 감싸져 있어야 에러가 안 납니다.
    const message = `🚨 [KS에너지 대구지사] 신규 상담 신청 🚨

👤 성함/법인명: ${name}
📞 연락처: ${phone}
🏭 부지형태: ${type}
📍 문의 및 주소: ${content}

대구팀 신속하게 확인 후 연락 바랍니다!`.trim();

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '1781982606',
        text: message,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.description || '텔레그램 전송 실패');
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}