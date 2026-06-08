'use client';

import React, { useState, useRef, useEffect } from 'react';
import RealtimePopup from '../../components/RealtimePopup'; // 상위 폴더 탈출 경로 유지
import { useRouter } from 'next/navigation';

export default function RpsHome() {
  const popupRef = useRef(null);
  const router = useRouter();
  const [quoteRoute, setQuoteRoute] = useState('select');

  // 모바일/PC 통합 강제 스크롤 리빌 엔진 + 협력사 무한 롤링 배너 CSS 주입
  useEffect(() => {
    if (!document.getElementById('rps-combined-styles')) {
      const style = document.createElement('style');
      style.id = 'rps-combined-styles';
      style.innerHTML = `
        .reveal-up {
          opacity: 0 !important;
          transform: translateY(25px) !important;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out !important;
          will-change: opacity, transform;
        }
        .reveal-up.active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes rpsMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-flow {
          display: flex;
          width: max-content;
          animation: rpsMarquee 22s linear infinite !important;
        }
      `;
      document.head.appendChild(style);
    }

    const reveals = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.01
    });

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [quoteRoute]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    type: '상가·원룸 옥상 (RPS 자가용)',
    content: 'RPS 소규모 자가용 최저 단가 비교 및 진단 요청 (최소 50평 기준)'
  });
  
  const [status, setStatus] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleRouteSelect = (route) => {
    setQuoteRoute(route);
    setFormData(prev => ({
      ...prev,
      content: route === 'yes' 
        ? '[기존 견적 보유] 타사 견적서 거품 제거 및 직영 단가 비교 검토 요청 (50평 이상)'
        : '[신규 문의] 소형 옥상 맞춤형 초가성비 가견적 및 전기세 절감액 산출 요청 (50평 이상)'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의하셔야 진단 신청이 가능합니다.');
      return;
    }
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        if (popupRef.current) {
          popupRef.current.triggerRealToast(formData.name, formData.type);
        }
        setFormData({ 
          name: '', phone: '', address: '', 
          type: '상가·원룸 옥상 (RPS 자가용)', 
          content: 'RPS 소규모 자가용 최저 단가 비교 및 진단 요청 (최소 4~50평 기준)' 
        });
        setPrivacyAgreed(false);
        setQuoteRoute('select');

        setTimeout(() => {
          router.push('/rps/thank-you');
        }, 500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* GNB */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-slate-900">KS에너지</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded">대구지사 빌딩RPS 팀</span>
          </div>
          <a href="#diagnostic-form" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            무료 비교견적 받기
          </a>
        </div>
      </header>

      {/* 1. 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-12 px-4 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold tracking-wider px-3 py-1 rounded mb-4">
              📢 상가·원룸·빌딩 옥상 전문 (40~50평 이상 대상)
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white reveal-up">
              상가 관리비 절감,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                생각보다 적은 비용
              </span>으로 가능합니다
            </h1>
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed max-w-xl reveal-up">
              태양광 설치비가 비쌀까 봐 주저하셨나요? 중간 영업 마진과 과도한 유통 수수료를 걷어낸 <strong>'직영 시공 단가'</strong>로 거품 없는 합리적인 견적을 직접 비교해 보세요.
            </p>
          </div>

          {/* 인터랙티브 고전환 폼 */}
          <div id="diagnostic-form" className="lg:col-span-5 w-full max-w-md mx-auto reveal-up">
            <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              {quoteRoute === 'select' && (
                <div className="text-center py-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">이미 타사 견적을 받아보셨나요?</h2>
                  <p className="text-slate-500 text-xs mb-6">원하시는 경로를 선택하시면 가장 정확한 분석을 제공합니다.</p>
                  <div className="space-y-3">
                    <button type="button" onClick={() => handleRouteSelect('yes')} className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1">
                      <span className="text-base">🙋‍♂️ 네, 이미 받아본 견적이 있습니다</span>
                      <span className="text-[11px] text-emerald-600 font-normal">받으신 견적서와 비교해보세요 무료로 분석해 드립니다</span>
                    </button>
                    <button type="button" onClick={() => handleRouteSelect('no')} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1">
                      <span className="text-base">🙅‍♂️ 아니오, 처음 알아보는 중입니다</span>
                      <span className="text-[11px] text-slate-500 font-normal">옥상 평수별 최저 기준 예상 시공비를 산출해 드립니다</span>
                    </button>
                  </div>
                </div>
              )}

              {quoteRoute !== 'select' && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      {quoteRoute === 'yes' ? '📊 기존 견적 비교 분석' : '📋 맞춤형 예상 단가 조회'}
                    </h2>
                    <button type="button" onClick={() => setQuoteRoute('select')} className="text-slate-400 hover:text-slate-600 text-xs">← 다시 선택</button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">성함 / 상호명</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="예: 홍길동" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="예: 010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">건물 / 토지 주소</label>
                    <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="번지수까지 기재 시 정확한 분석 가능" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">예상 옥상 평수 (최소 40평부터 진행 가능)</label>
                    <input 
                      type="text" 
                      required
                      onChange={(e) => setFormData({...formData, content: `[RPS 자가용] 예상 평수: ${e.target.value} / 회사 기준 필터링 확인`})} 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" 
                      placeholder="예: 50평, 80평, 120평 등" 
                    />
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="privacy_agree_rps" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer rounded" required />
                    <label htmlFor="privacy_agree_rps" className="text-[11px] text-slate-500 leading-tight">
                      <span className="text-red-500 font-bold">[필수]</span> 개인정보 수집 이용 동의
                    </label>
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg text-sm">
                    {status === 'sending' ? '분석 요청 중...' : '맞춤 직영 단가 확인하기'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 시공 명분 제공 */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center reveal-up">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">태양광 설치비, 꼭 비싸야 할 이유는 없습니다</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm reveal-up">
            <h3 className="font-bold text-base text-red-600 mb-2">🛑 일반적인 우회 대행 업체</h3>
            <p className="text-slate-600 text-xs leading-relaxed">독립 영업사원 수수료와 외주 시공비가 중첩되어 단가가 상승합니다.</p>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm reveal-up">
            <h3 className="font-bold text-base text-emerald-700 mb-2">✅ KS에너지 대구지사 직영 구조</h3>
            <p className="text-slate-700 text-xs leading-relaxed">대기업 정품 자재 수급부터 책임 시공까지 다이렉트로 진행하여 불필요한 마진을 뺐습니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 표준 설계안 표 */}
      <section className="bg-white py-16 px-6 border-y border-slate-100 reveal-up">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">건물 규모별 맞춤 설계안</h2>
          <p className="text-slate-500 text-xs text-center mb-6">상가 및 원룸 옥상 공간을 활용한 실제 자가용(RPS) 표준 설계 규격입니다.</p>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm reveal-up">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs">
                  <th className="py-3 px-4 font-semibold">옥상 실평수 기준</th>
                  <th className="py-3 px-4 font-semibold">최소 설계 용량</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">주요 기대 효과</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 40평 ~ 60평</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">20kW 기본형</td>
                  <td className="py-4 px-4 text-slate-800 text-left pl-4">🏢 일반 원룸 · 상가건물 공용 전기세 바닥으로 다운</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 70평 ~ 90평</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">30kW ~ 40kW</td>
                  <td className="py-4 px-4 text-slate-800 text-left pl-4">⚡ 엘리베이터 및 주차 타워 운용 빌딩 관리비 대폭 절감</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 120평 이상</td>
                  <td className="py-4 px-4 text-emerald-600 font-bold">50kW ~ 맞춤형</td>
                  <td className="py-4 px-4 text-slate-800 text-left pl-4">🏭 중형 사옥 · 요양원 · 대형 식당 고정 지출 자산화 시뮬레이션</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            * 당사는 상업용 직영 시공 전문으로, 옥상 면적 50평(설치 용량 20kW) 이상인 사업장만 정밀 분석이 가능합니다.
          </p>
        </div>
      </section>

      {/* 4. 신뢰 지표 */}
      <section className="bg-white py-16 px-6 border-b border-slate-100 reveal-up">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Proven Track Record</span>
            <h3 className="text-2xl font-bold mt-1 mb-4 text-slate-900">롯데타워 롯데물산이 고른 기술력</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              국내 최고층 빌딩인 롯데타워와 특급호텔 시그니엘서울의 데이터 기반 전기요금 절감 컨설팅을 성공시킨 기술력 그대로 대구·경북 자가용 발전소 시공을 책임집니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">공공기관 레퍼런스</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">서울시중구시설관리공단 에너지 절감 성과 실현 외 다수</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">대기업 파트너십</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">한화솔루션, SK E&S, 신성이엔지 등 1등급 공식 협력 부품 사용</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 협력사 롤링 배너 */}
      <section className="bg-slate-100 py-6 overflow-hidden select-none border-y border-slate-200/50">
        <div style={marqueeStyles.marqueeContainer}>
          <div className="animate-marquee-flow">
            <span style={marqueeStyles.marqueeItem}>한화솔루션</span>
            <span style={marqueeStyles.marqueeItem}>SK E&S</span>
            <span style={marqueeStyles.marqueeItem}>엔라이튼</span>
            <span style={marqueeStyles.marqueeItem}>신성이엔지</span>
            <span style={marqueeStyles.marqueeItem}>H에너지</span>
            <span style={marqueeStyles.marqueeItem}>CNCITY ENERGY</span>
            
            <span style={marqueeStyles.marqueeItem}>한화솔루션</span>
            <span style={marqueeStyles.marqueeItem}>SK E&S</span>
            <span style={marqueeStyles.marqueeItem}>엔라이튼</span>
            <span style={marqueeStyles.marqueeItem}>신성이엔지</span>
            <span style={marqueeStyles.marqueeItem}>H에너지</span>
            <span style={marqueeStyles.marqueeItem}>CNCITY ENERGY</span>
          </div>
        </div>
      </section>

      {/* 6. [되살림 완벽 복구] 전문 멀티라인 푸터 영역 */}
      <footer className="bg-slate-950 text-slate-500 text-center py-10 text-xs border-t border-slate-900 space-y-2">
        <p className="font-semibold text-slate-400">KS에너지 대구지사 | RPS 자가용 견적 비교 전용 랜딩페이지</p>
        <div className="text-slate-600 max-w-md mx-auto leading-relaxed">
          <p>상호명(사업자명): 노네임(Noname) | 대표자: 이정현</p>
          <p>사업자등록번호: 635-67-00527</p>
          <p>주소: 대구 북구 동북로291 901-a97</p>
        </div>
        <p className="text-[10px] text-slate-700 pt-2">© Noname. All rights reserved.</p>
      </footer>

      {/* 🔥 [치명적 버그 수정] type="rps" 명시하여 상가/원룸 알림 강제 주입 */}
      <RealtimePopup type="rps" ref={popupRef} />
    </div>
  );
}

const marqueeStyles = {
  marqueeContainer: { display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' },
  marqueeItem: { fontSize: '16px', fontWeight: 'bold', color: '#94a3b8', padding: '0 30px', whiteSpace: 'nowrap', display: 'inline-block' }
};