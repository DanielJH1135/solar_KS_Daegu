'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

// 🏢 공통 대구·경북 지역 데이터
const locations = [
  '대구 달서구', '대구 북구', '대구 서구', '대구 동구', '대구 수성구', '대구 달성군',
  '경북 구미', '경북 칠곡', '경북 경산', '경북 왜관', '경북 영천', '경북 포항', '경북 경주'
];

// ==========================================
// 1. [기존] 공장 및 산업체 전용 데이터 부하
// ==========================================
const factoryTargets = ['** 법인', '** 사장님', '** 대표님', '** 창고', '** 공장', '** 산업', '*축산', '**ENG', '**CNC', '***정밀'];
const factorySuffixes = [
  '방금 전 상담 신청 완료!',
  '3분 전 지원사업 문의 완료!',
  '방금 전 부지 검토 신청 완료!',
  '1분 전 실시간 상담 접수!',
  '실시간 상담 접수 완료!',
  '상담 접수 완료'
];

// ==========================================
// 2. [신규] 상가·원룸 자가용(RPS) 전용 데이터 부하
// ==========================================
const rpsTargets = ['** 건물주님', '** 원룸 소유주님', '** 상가 사장님', '** 빌딩 대표님', '옥상 소유주님', '** 상가주택 사장님', '** 관리인님', '***빌딩 관리단 대표님', '****원룸 소유주님'];
const rpsSuffixes = [
  '방금 전 타사 비교견적 검토 요청 완료!',
  '2분 전 옥상 맞춤형 첫 견적 문의 완료!',
  '3분 전 상가 전기세 절감 견적 신청!',
  '방금 전 직영 단가 비교 접수!',
  '1분 전 원룸 공용 관리비 진단 요청!',
  '실시간 직영 단가 비교 신청 완료!',
  '5분 전 옥상 평수 기준 예상 시공비 제안신청 완료!'
];

// 구조적 프로퍼티(type) 분기 바인딩
const RealtimePopup = forwardRef(({ type = 'factory' }, ref) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [animate, setAnimate] = useState(false);

  // 현재 페이지 타입에 따른 맞춤형 무작위 문장 조립 엔진
  const generateRandomToast = () => {
    const loc = locations[Math.floor(Math.random() * locations.length)];
    
    // rps 유입인지 공장 유입인지 판별
    const isRps = type === 'rps';
    const targetPool = isRps ? rpsTargets : factoryTargets;
    const suffixPool = isRps ? rpsSuffixes : factorySuffixes;

    const tar = targetPool[Math.floor(Math.random() * targetPool.length)];
    const suf = suffixPool[Math.floor(Math.random() * suffixPool.length)];
    
    return `${loc} ${tar} ${suf}`;
  };

  // 진짜 양식을 제출했을 때 팝업 강제 구동 스위치
  useImperativeHandle(ref, () => ({
    triggerRealToast: (name, typeParam) => {
      const maskedName = name ? `${name.charAt(0)}** 사장님` : '** 사장님';
      const selectedType = typeParam ? typeParam : '태양광 발전 부지';
      
      setAnimate(false);
      setVisible(false);
      
      setTimeout(() => {
        setText(`📢 [실시간] ${maskedName} [${selectedType}] 방금 전 상담 신청 완료!`);
        setVisible(true);
        setAnimate(true);
      }, 200);
    }
  }));

  // 주기적 팝업 루프 렌더링 감지 연동
  useEffect(() => {
    let timeoutId;

    const startRandomLoop = () => {
      const randomInterval = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;

      timeoutId = setTimeout(() => {
        setText(generateRandomToast());
        setVisible(true);
        setAnimate(true);

        setTimeout(() => {
          setAnimate(false);
          setTimeout(() => setVisible(false), 300);
          startRandomLoop();
        }, 4000);

      }, randomInterval);
    };

    const initialId = setTimeout(() => {
      setText(generateRandomToast());
      setVisible(true);
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          setVisible(false);
          startRandomLoop();
        }, 300);
      }, 4000);
    }, 3000);

    return () => {
      clearTimeout(initialId);
      clearTimeout(timeoutId);
    };
  }, [type]); // 타입 변경 시 인터벌 정상 재배치 스위칭 가동

  if (!visible) return null;

  return (
    <div 
      style={{
        ...styles.toastContainer,
        transform: animate ? 'translateY(0)' : 'translateY(100px)',
        opacity: animate ? 1 : 0,
      }}
    >
      <div style={styles.iconCircle}>✓</div>
      <div style={styles.toastText}>{text}</div>
    </div>
  );
});

RealtimePopup.displayName = 'RealtimePopup';

const styles = {
  toastContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '12px 18px',
    borderRadius: '30px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 9999,
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease-out',
    maxWidth: 'calc(100% - 40px)',
  },
  iconCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  toastText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};

export default RealtimePopup;