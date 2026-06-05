import Link from 'next/link';

export const metadata = {
  title: '진단 완료 | KS에너지 경상권',
  description: '태양광 임대 및 추가 수익 분석 요청이 정상적으로 완료되었습니다.',
};

export default function ThankYouPage() {
  return (
    <div style={{
      display: 'block',
      maxWidth: '520px',
      margin: '60px auto',
      textAlign: 'center',
      padding: '40px 24px',
      fontFamily: 'sans-serif',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f1f5f9'
    }}>
      {/* 상단 에너지 포인트 아이콘 */}
      <div style={{ fontSize: '60px', marginBottom: '16px' }}>⚡️</div>
      
      {/* 긴박감을 주는 선착순 마감 안내 태그 */}
      <span style={{
        display: 'inline-block',
        backgroundColor: '#fef2f2',
        color: '#ef4444',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '5px 14px',
        borderRadius: '100px',
        marginBottom: '20px',
        letterSpacing: '-0.3px'
      }}>
        🚨 경상권 선착순 40개소 우선 분석 진행 중 (22개소 완료)
      </span>

      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '900', 
        color: '#0f172a', 
        marginBottom: '14px', 
        letterSpacing: '-0.5px',
        lineHeight: '1.3'
      }}>
        분석 요청이<br />정상적으로 완료되었습니다!
      </h1>
      
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '32px' }}>
        KS에너지 경상권 유휴 부지 무료 진단을 이용해 주셔서 감사합니다.<br />
        남겨주신 주소를 바탕으로 <strong>즉시 정밀 분석에 착수</strong>합니다.
      </p>

      {/* 사장님들에게 신뢰를 주는 향후 진행 절차 안내 박스 */}
      <div style={{
        textAlign: 'left',
        backgroundColor: '#f8fafc',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '32px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '14px' }}>
          🎯 리포트 추출 및 향후 진행 절차
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li style={{ fontSize: '13px', color: '#334155', marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span>
            <div><strong>위성 도면 분석 :</strong> 구조물 설치 가능 음영 구역 및 실평수를 정밀 분석합니다.</div>
          </li>
          <li style={{ fontSize: '13px', color: '#334155', marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span>
            <div><strong>한전 선로 조회 :</strong> 해당 주소 인근 배전 선로의 여유 연계 용량을 즉시 확인합니다.</div>
          </li>
          <li style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'flex-start', lineHeight: '1.5' }}>
            <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span>
            <div><strong>최대 조건 시뮬레이션 :</strong> 500평 기준 최대 4,725만 원 일시 지급 등 참여 파트너사별 최적 정산 지표를 매칭하여 24시간 이내에 연락드립니다.</div>
          </li>
        </ul>
      </div>

      {/* 메인 화면으로 돌아가 핵심 실적을 다시 정독하게 만드는 CTA 버튼 */}
      <Link href="/" style={{
        display: 'block',
        backgroundColor: '#059669', /* 광고 메인 테마인 에메랄드 그린 컬러 매칭 */
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '15px',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
        letterSpacing: '-0.3px'
      }}>
        공식 홈페이지에서 핵심 실적 확인하기
      </Link>
    </div>
  );
}