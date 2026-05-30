'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

// 1. 무작위 주머니 데이터 설정
const locations = [
  '대구 달서구', '대구 북구', '대구 서구', '대구 동구', '대구 수성구', '대구 달성군',
  '경북 구미', '경북 칠곡', '경북 경산', '경북 왜관', '경북 영천', '경북 포항', '경북 경주', '경남 밀양', '경남 김해', '경남 창원', '경남 거창'
];

const targets = ['** 법인', '** 사장님', '** 대표님', '** 창고', '** 공장', '** 산업, **ENG, **철강'];

const suffixes = [
  '방금 전 상담 신청 완료!',
  '3분 전 지원사업 문의 완료!',
  '방금 전 부지 검토 신청 완료!',
  '1분 전 실시간 상담 접수!'
  '실시간 접수 완료!'
  '상담 신청 완료'
];

const RealtimePopup = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  // 2. 랜덤 무작위 문장 조립 함수
  const generateRandomToast = () => {
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const tar = targets[Math.floor(Math.random() * targets.length)];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${loc} ${tar} ${suf}`;
  };

  // 3. 외부(접근 폼)에서 진짜 신청이 들어왔을 때 호출할 함수 (새치기 기능)
  useImperativeHandle(ref, () => ({
    triggerRealToast: (name, address) => {
      // 주소에서 대구/경북 및 시/구/군 정보만 슥 추출 (예: "대구 달서구 상인동" -> "대구 달서구")
      let cleanLoc = '대구지사 관할';
      if (address) {
        const parts = address.split(' ');
        if (parts[0] && parts[1]) {
          cleanLoc = `${parts[0]} ${parts[1]}`;
        } else {
          cleanLoc = parts[0];
        }
      } else {
        // 주소 안 적었으면 랜덤 지역 하나 매칭
        cleanLoc = locations[Math.floor(Math.random() * locations.length)];
      }

      // 이름 마스킹 처리 (예: 이정현 -> 이** 사장님)
      const maskedName = name ? `${name.charAt(0)}** 사장님` : '** 사장님';
      
      // 강제로 기존 타이머 끄고 진짜 데이터로 세팅
      setVisible(false);
      setTimeout(() => {
        setText(`📢 [실시간] ${cleanLoc} ${maskedName} 방금 전 상담 신청 완료!`);
        setVisible(true);
      }, 300);
    }
  }));

  // 4. 평상시 돌아가는 무작위 타이머 루프
  useEffect(() => {
    let timeoutId;

    const startRandomLoop = () => {
      // 5초 ~ 12초 사이의 무작위 인터벌 계산
      const randomInterval = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;

      timeoutId = setTimeout(() => {
        setText(generateRandomToast());
        setVisible(true);

        // 4초 동안 보여줬다가 끄기
        setTimeout(() => {
          setVisible(false);
          // 꺼진 뒤 다시 루프 돌리기
          startRandomLoop();
        }, 4000);

      }, randomInterval);
    };

    // 최초 접속 후 3초 뒤 첫 팝업 가동
    const initialId = setTimeout(() => {
      setText(generateRandomToast());
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        startRandomLoop();
      }, 4000);
    }, 3000);

    return () => {
      clearTimeout(initialId);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.toastContainer}>
      <div style={styles.iconCircle}>✓</div>
      <div style={styles.toastText}>{text}</div>
    </div>
  );
});

RealtimePopup.displayName = 'RealtimePopup';

// 5. 모바일 및 PC 겸용 깔끔한 초록색 디자인 스타일 (인공지능 티 안 나게 CSS 직접 구성)
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
    animation: 'slideUp 0.3s ease-out',
    maxWidth: 'calc(100% - 40px)',
  },
  iconCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#10b981', // 깨끗한 초록색
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  toastText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};

// CSS 애니메이션 주입을 위한 임시 코드
if (typeof window !== 'undefined') {
  const styleSheet = document.styleSheets[0] || document.head.appendChild(document.createElement('style')).sheet;
  try {
    styleSheet.insertRule(`
      @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {}
}

export default RealtimePopup;