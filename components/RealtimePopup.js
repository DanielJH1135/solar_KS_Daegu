'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const locations = [
  '대구 달서구', '대구 북구', '대구 서구', '대구 동구', '대구 수성구', '대구 달성군',
  '경북 구미', '경북 칠곡', '경북 경산', '경북 왜관', '경북 영천', '경북 포항', '경북 경주','경남 밀양', '경남 사천', '경남 창녕', '경남 김해','경남 창원시'
];

const targets = ['** 법인', '** 사장님', '** 대표님', '** 창고', '** 공장', '** 산업', '**ENG', '****공업','**공업', '**철강', '*축산', '*****마트', '**주차장'];

const suffixes = [
  '방금 전 상담 신청 완료!',
  '3분 전 지원사업 문의 완료!',
  '방금 전 부지 검토 신청 완료!',
  '1분 전 실시간 상담 접수!'
];

const RealtimePopup = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [animate, setAnimate] = useState(false);

  const generateRandomToast = () => {
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const tar = targets[Math.floor(Math.random() * targets.length)];
    const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${loc} ${tar} ${suf}`;
  };

  useImperativeHandle(ref, () => ({
    triggerRealToast: (name, type) => {
      let cleanLoc = locations[Math.floor(Math.random() * locations.length)];
      const maskedName = name ? `${name.charAt(0)}** 사장님` : '** 사장님';
      
      setAnimate(false);
      setVisible(false);
      
      setTimeout(() => {
        setText(`📢 [실시간] ${cleanLoc} ${maskedName} 방금 전 상담 신청 완료!`);
        setVisible(true);
        setAnimate(true);
      }, 200);
    }
  }));

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
          setTimeout(() => setVisible(false), 300); // 사라지는 애니메이션 대기
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
  }, []);

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
    transition: 'all 0.3s ease-out', // 자바스크립트 기반 컴포넌트 스타일로 부드럽게 처리
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