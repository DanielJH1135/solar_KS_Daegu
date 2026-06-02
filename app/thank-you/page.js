import Link from 'next/link';

export const metadata = {
  title: '신청 완료 | KS에너지 대구지사',
  description: '태양광 상담 신청이 정상적으로 완료되었습니다.',
};

export default function ThankYouPage() {
  return (
    <div style={{
      display: 'block',
      maxWidth: '500px',
      margin: '100px auto padding',
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'sans-serif'
    }}>
      {/* 체크 아이콘 이미지 대용 */}
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>☀️</div>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
        상담 신청이 완료되었습니다!
      </h1>
      
      <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', marginBottom: '32px' }}>
        KS에너지 대구지사를 찾아주셔서 감사합니다.<br />
        보내주신 정보를 토대로 신속하게 분석하여<br />
        **빠른 시일 내에 전문 상담사가 연락드리겠습니다.**
      </p>

      <Link href="/" style={{
        display: 'inline-block',
        backgroundColor: '#2563EB',
        color: '#ffffff',
        padding: '12px 32px',
        borderRadius: '8px',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '15px',
        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
      }}>
        메인으로 돌아가기
      </Link>
    </div>
  );
}