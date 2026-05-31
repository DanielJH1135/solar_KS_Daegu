'use client';

import React, { useState, useRef } from 'react'; // 1. useRef를 추가했습니다.
import RealtimePopup from '../components/RealtimePopup'; // 점(.)을 두 개로 변경!

export default function Home() {
  // 3. 팝업 컴포넌트를 제어할 연결선(Ref)을 선언합니다.
  const popupRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '공장 지붕 / 건물 옥상',
    content: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');

        // 4. [대박 핵심] 서버 전송이 성공한 바로 그 순간, 사용자가 입력한 값으로 팝업 새치기를 시전합니다!
        if (popupRef.current) {
          popupRef.current.triggerRealToast(formData.name, formData.type);
        }

        setFormData({ name: '', phone: '', type: '공장 지붕 / 건물 옥상', content: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* GNB (헤더 상단 바) */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-slate-900">KS에너지</span>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded">대구지사</span>
          </div>
          <a href="#contact" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            무료 상담 신청
          </a>
        </div>
      </header>

      {/* 1. 헤드라인 (Hero Section) */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-emerald-500/20 mb-6">
            EMPOWERING TOMORROW WITH SUSTAINABLE INNOVATION
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            노는 공장 지붕과 부지, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              확실한 태양광 연금
            </span>으로 바꿉니다
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            본사의 독보적인 시공 역량, 대구지사의 신속한 지역 밀착형 관리(O&M)의 만남. 지금 최고의 태양광 파트너를 만나보세요.
          </p>
          <a href="#contact" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5">
            대구지사 무료 현장 실사 신청
          </a>
        </div>
      </section>

      {/* 본사 핵심 실적 배너 */}
      <section className="bg-slate-900 text-white py-12 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Proven Track Record</span>
            <h3 className="text-2xl font-bold mt-1 mb-3 text-white">롯데타워 롯데물산이 선택한 검증된 기술력</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              국내 최고층 빌딩인 롯데타워와 특급호텔 시그니엘서울의 데이터 기반 전기요금 절감 컨설팅을 성공시킨 KS에너지의 기술력 그대로, 대구 경북 발전소 시공을 책임집니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl text-center">
              <p className="text-xs text-slate-400 font-medium">공공기관 레퍼런스</p>
              <p className="text-lg font-black text-white mt-1">서울시중구시설관리공단 에너지 절감 성과 실현</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl text-center">
              <p className="text-xs text-slate-400 font-medium">최고급 호텔 레퍼런스</p>
              <p className="text-lg font-black text-white mt-1">시그니엘 서울 빌딩과 호텔 모두 절감 성과</p>
            </div>
          </div>
        </div>
      </section>

      {/* 비즈니스 협력사 무한 롤링 배너 (모바일 겹침 억까 완전 해결 버젼) */}
      <section className="bg-white border-b border-slate-200 py-8 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 mb-3">
          <p className="text-center text-xs font-bold text-slate-400 tracking-wider uppercase">
            KS에너지 공식 비즈니스 협력사
          </p>
        </div>
        
        {/* 무한 전광판 기차 트랙 컨테이너 */}
        <div style={marqueeStyles.marqueeContainer}>
          <div style={marqueeStyles.marqueeTrack}>
            {/* 원본 세트 */}
            <span style={marqueeStyles.marqueeItem}>한화솔루션</span>
            <span style={marqueeStyles.marqueeItem}>SK E&S</span>
            <span style={marqueeStyles.marqueeItem}>엔라이튼</span>
            <span style={marqueeStyles.marqueeItem}>신성이엔지</span>
            <span style={marqueeStyles.marqueeItem}>H에너지</span>
            <span style={marqueeStyles.marqueeItem}>CNCITY ENERGY</span>
            
            {/* 자연스러운 무한 루프용 복사본 세트 */}
            <span style={marqueeStyles.marqueeItem}>한화솔루션</span>
            <span style={marqueeStyles.marqueeItem}>SK E&S</span>
            <span style={marqueeStyles.marqueeItem}>엔라이튼</span>
            <span style={marqueeStyles.marqueeItem}>신성이엔지</span>
            <span style={marqueeStyles.marqueeItem}>H에너지</span>
            <span style={marqueeStyles.marqueeItem}>CNCITY ENERGY</span>
          </div>
        </div>

        {/* CSS 키프레임 애니메이션 주입 */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes globalMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </section>

      {/* 2. 핵심 사업 영역 */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Our Service</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">대구지사 핵심 사업 영역</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-2 text-emerald-600">01</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">임대사업</h3>
            <p className="text-slate-600 text-xs leading-relaxed">토지 및 공장 지붕 맞춤형 태양광 발전소 설계 및 인허가 총괄</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-2 text-emerald-600">02</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">태양광 리스사업</h3>
            <p className="text-slate-600 text-xs leading-relaxed">공장, 창고 등 지붕 맞춤형 발전소 및 초기비용 없이 태양광발전</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-2 text-emerald-600">03</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">전력비 절감</h3>
            <p className="text-slate-600 text-xs leading-relaxed">대형 빌딩 노하우 기반, 설비 교체 없는 데이터 기반 요금제 최적화</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-2 text-emerald-600">04</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">RE100 컨설팅</h3>
            <p className="text-slate-600 text-xs leading-relaxed">글로벌 규제 및 기업 요구에 맞춘 신재생에너지 전환 및 RE100 솔루션</p>
          </div>
        </div>
      </section>

      {/* 3. 강점 */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              지사는 가까워야 하고,<br />본사는 신뢰할 수 있어야 합니다
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              태양광 발전소는 한 번 구축하면 20년 이상 가동됩니다. 시공업체가 멀리 있거나 도중에 사라지면 발전 손실을 고스란히 사업주가 떠안게 됩니다. 
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>KS에너지 대구지사</strong>는 대구 경북 전 지역에 문제가 발생할 시 즉각 대응할 수 있는 지역 밀착형 사후관리 인프라를 구축하고 있습니다.
            </p>
          </div>
          <div className="bg-slate-850 border border-slate-800 p-8 rounded-2xl space-y-4">
            <div className="flex gap-4 items-start">
              <span className="text-emerald-400 text-lg">✔</span>
              <p className="text-sm text-slate-300">대구 경북 전 지역 24시간 이내 즉각 대응 AS</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-emerald-400 text-lg">✔</span>
              <p className="text-sm text-slate-300">본사 원천 기술 기반의 정확한 가상 음영/수익 분석</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-emerald-400 text-lg">✔</span>
              <p className="text-sm text-slate-300">구조 정밀 진단을 통한 공장 지붕 손상 제로 시공</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 문의하기 폼 */}
      <section id="contact" className="py-20 px-6 max-w-xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2"> 무료 컨설팅 신청</h2>
            <p className="text-sm text-slate-500">정보를 남겨주시면 대구지사 전담 컨설턴트가 직접 확인 후 연락드립니다.</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">성함 / 법인명</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="홍길동 (또는 OO기획)" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">연락처</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="010-0000-0000" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">부지 형태</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-600">
                <option>공장 지붕 / 건물 옥상</option>
                <option>일반 토지 / 야산 / 나대지</option>
                <option>전력비 절감 컨설팅</option>
                <option>기타 부지</option>
                <option>주차장+옥상</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">문의 내용 또는 부지 주소</label>
              <textarea rows={3} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="상담받으실 부지 주소를 적어주시면 더 정확한 분석이 가능합니다."></textarea>
            </div>
            
            <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-md transition-colors text-sm mt-2">
              {status === 'sending' ? '신청서 전송 중...' : '무료 컨설팅 신청하기'}
            </button>

            {status === 'success' && <p className="text-center text-sm font-semibold text-emerald-600 mt-2">✨ 상담 신청이 정상적으로 완료되었습니다! 지사에서 곧 연락드리겠습니다.</p>}
            {status === 'error' && <p className="text-center text-sm font-semibold text-red-500 mt-2">❌ 전송 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>}
          </form>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-slate-950 text-slate-500 text-center py-8 text-xs border-t border-slate-900">
        <p>KS에너지 대구지사 | 비즈니스 문의 전용 랜딩페이지</p>
        <p className="mt-1 text-slate-600">주소: 대구 서구 서대구로20 26층 3호</p>
      </footer>

      {/* 5. [수정 완료] 최하단 마감 전에 팝업 컴포넌트를 얹어주고 연결선을 장착합니다! */}
      <RealtimePopup ref={popupRef} />
    </div>
  );
}

// 모바일 롤링 전광판 전용 보완 인라인 스타일 오브젝트
const marqueeStyles = {
  marqueeContainer: {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
    marginTop: '8px',
  },
  marqueeTrack: {
    display: 'flex',
    width: 'max-content',
    animation: 'globalMarquee 20s linear infinite',
  },
  marqueeItem: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#cbd5e1', 
    padding: '0 32px', 
    whiteSpace: 'nowrap',
    display: 'inline-block',
  }
};
