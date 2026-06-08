'use client';

import React, { useState, useRef, useEffect } from 'react';
import RealtimePopup from '../components/RealtimePopup'; // 경로 탐색기 기준 매칭
import { useRouter } from 'next/navigation';

export default function RpsHome() {
  const popupRef = useRef(null);
  const router = useRouter();
  const [quoteRoute, setQuoteRoute] = useState('select');

  // ✅ 모바일/PC 전천후 스크롤 애니메이션 엔진 + 내장 스타일 주입
  useEffect(() => {
    if (!document.getElementById('scroll-reveal-style')) {
      const style = document.createElement('style');
      style.id = 'scroll-reveal-style';
      style.innerHTML = `
        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: opacity, transform;
        }
        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
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
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.02 // 모바일 스크롤 속도를 고려해 살짝만 보여도 즉시 발동되도록 최적화
    });

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [quoteRoute]); // 폼 교체 시 재감지를 위해 의존성 추가

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    type: '상가·원룸 옥상 (RPS 자가용)',
    content: 'RPS 소규모 자가용 최저 단가 비교 및 진단 요청'
  });
  
  const [status, setStatus] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleRouteSelect = (route) => {
    setQuoteRoute(route);
    setFormData(prev => ({
      ...prev,
      content: route === 'yes' 
        ? '[기존 견적 보유] 타사 견적서 거품 제거 및 직영 단가 비교 검토 요청'
        : '[신규 문의] 소형 옥상 맞춤형 초가성비 가견적 및 전기세 절감액 산출 요청'
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
          content: 'RPS 소규모 자가용 최저 단가 비교 및 진단 요청' 
        });
        setPrivacyAgreed(false);
        setQuoteRoute('select');

        setTimeout(() => {
          router.push('/rps/thank-you'); // ✅ 수정된 폴더 경로 주소로 정확히 매칭
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
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-slate-900">KS에너지</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded">대구 자가용 전문</span>
          </div>
          <a href="#diagnostic-form" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            무료 비교견적 받기
          </a>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-12 px-4 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold tracking-wider px-3 py-1 rounded mb-4">
              📢 상가·원룸·꼬마빌딩 옥상 맞춤형 설계
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

          <div id="diagnostic-form" className="lg:col-span-5 w-full max-w-md mx-auto reveal-up">
            <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              {quoteRoute === 'select' && (
                <div className="text-center py-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">이미 타사 견적을 받아보셨나요?</h2>
                  <p className="text-slate-500 text-xs mb-6">원하시는 경로를 선택하시면 가장 정확한 분석을 제공합니다.</p>
                  <div className="space-y-3">
                    <button type="button" onClick={() => handleRouteSelect('yes')} className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1">
                      <span className="text-base">🙋‍♂️ 네, 이미 받아본 견적이 있습니다</span>
                    </button>
                    <button type="button" onClick={() => handleRouteSelect('no')} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1">
                      <span className="text-base">🙅‍♂️ 아니오, 처음 알아보는 중입니다</span>
                    </button>
                  </div>
                </div>
              )}

              {quoteRoute !== 'select' && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      {quoteRoute === 'yes' ? '📊 기존 견적 거품 교체 분석' : '📋 맞춤형 예상 단가 조회'}
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
                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="privacy_agree_rps" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer rounded" required />
                    <label htmlFor="privacy_agree_rps" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                      <span className="text-red-500 font-bold">[필수]</span> 개인정보 수집 이용 동의
                    </label>
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg text-sm">
                    {status === 'sending' ? '분석 요청 중...' : '맞춤 단가 확인하기'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center reveal-up">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">태양광 설치비, 꼭 비싸야 할 이유는 없습니다</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm reveal-up">
            <h3 className="font-bold text-base text-red-600 mb-2">🛑 일반적인 우회 대행 업체</h3>
            <p className="text-slate-600 text-xs leading-relaxed">독립 영업사원 수수료와 외주 시공비가 중첩되어 단가가 상승합니다.</p>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm reveal-up">
            <h3 className="font-bold text-base text-emerald-700 mb-2">✅ KS에너지 대구지사 직영 구조</h3>
            <p className="text-slate-700 text-xs leading-relaxed">대기업 정품 자재 수급부터 책임 시공까지 다이렉트로 진행하여 거품을 뺐습니다.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 border-y border-slate-100 reveal-up">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">건물 규모별 맞춤 설계 설계안</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm reveal-up">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs">
                  <th className="py-3 px-4 font-semibold">옥상 권장 평수</th>
                  <th className="py-3 px-4 font-semibold">예상 용량</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">주요 기대 효과</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 10평~15평</td>
                  <td className="py-4 px-4 text-slate-500">3kW ~ 5kW</td>
                  <td className="py-4 px-4 text-slate-800 text-left pl-4">🏡 고전력 가전 전기세 상쇄</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 20평~30평</td>
                  <td className="py-4 px-4 text-slate-500">6kW ~ 10kW</td>
                  <td className="py-4 px-4 text-slate-800 text-left pl-4">🏢 공용 관리비 대폭 절감</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-500 text-center py-10 text-xs border-t border-slate-900">
        <p>상호명: 노네임(Noname) | 대표자: 이정현 | 사업자번호: 635-67-00527</p>
      </footer>
      <RealtimePopup ref={popupRef} />
    </div>
  );
}

const marqueeStyles = {
  marqueeContainer: { display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' },
  marqueeTrack: { display: 'flex', width: 'max-content', animation: 'globalMarquee 20s linear infinite' },
  marqueeItem: { fontSize: '16px', fontWeight: 'bold', color: '#94a3b8', padding: '0 24px', whiteSpace: 'nowrap', display: 'inline-block' }
};