'use client'; // ✅ 다른 페이지 보셨던 애니메이션 효과를 위해 'use client' 추가

import Link from 'next/link';

// ✅ 메타데이터는 클라이언트 컴포넌트 내부에서 export 불가. 필요 시 app Router 레이아웃 등에서 처리.

export default function RpsThankYouPage() {
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
      <div style={{ fontSize: '60px', marginBottom: '16px' }}>🎉</div>
      
      {/* 긴박감을 주는 선착순 마감 안내 태그 (소형 맞춤형 문구로 수정) */}
      <span style={{
        display: 'inline-block',
        backgroundColor: '#ecfdf5', // 에메랄드 50으로 변경 (RPS 전용 테마)
        color: '#059669', // 에메랄드 600
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '5px 14px',
        borderRadius: '100px',
        marginBottom: '20px',
        letterSpacing: '-0.3px'
      }}>
        📍 대구·경북 소규모 옥상/자가용(RPS) 전용 맞춤 분석 진행 중
      </span>

      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: '900', 
        color: '#0f172a', 
        marginBottom: '14px', 
        letterSpacing: '-0.5px',
        lineHeight: '1.3'
      }}>
        자가용 태양광 맞춤 진단<br />분석 요청이 완료되었습니다!
      </h1>
      
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '32px' }}>
        상가·원룸 관리비 절감 실현을 위한 KS에너지 직영 최저 단가 비교 및 정밀 분석에 <strong>즉시 착수</strong>합니다.
      </p>

      {/* 사장님들에게 신뢰를 주는 향후 진행 절차 안내 박스 (RPS 전용 절차로 수정) */}
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
            <div><strong>위성 도면 분석 :</strong> 상가·원룸 옥상 설치 가능 면적 및 음영 구역을 정밀 분석합니다.</div>
          </li>
          <li style={{ fontSize: '13px', color: '#334155', marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span>
            <div><strong>한전 선로 조회 :</strong> 소형 발전기 연계를 위한 해당 주소 인근 배전 선로 용량을 확인합니다.</div>
          </li>
          <li style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'flex-start', lineHeight: '1.5' }}>
            <span style={{ color: '#10b981', marginRight: '8px', fontWeight: 'bold' }}>✓</span>
            <div><strong>맞춤형 리포트 :</strong> 기존 견적서 대비 직영 최저 단가 비교 및 예상 전기세 절감액 시뮬레이션을 24시간 이내에 정리해 연락드립니다.</div>
          </li>
        </ul>
      </div>

      {/* 메인 화면(RPS 메인)으로 돌아가 핵심 실적을 다시 정독하게 만드는 CTA 버튼 */}
      <Link href="/rps" style={{ // href를 /rps로 변경
        display: 'block',
        backgroundColor: '#059669', /* 에메랄드 그린 컬러 매칭 */
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '15px',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
        letterSpacing: '-0.3px'
      }}>
        최저 직영 단가 가성비 지표 다시 확인하기
      </Link>
    </div>
  );
}