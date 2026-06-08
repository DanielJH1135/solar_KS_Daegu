'use client';

import React, { useState, useRef } from 'react';
import RealtimePopup from '../../components/RealtimePopup';
import { useRouter } from 'next/navigation';

export default function RpsHome() {
  const popupRef = useRef(null);
  const router = useRouter();

  // 인터랙션 제어용 상태 ('select': 최초 선택, 'yes': 견적 있음, 'no': 견적 없음)
  const [quoteRoute, setQuoteRoute] = useState('select');

  // ✅ 백엔드 API 연동 포맷 완벽 유지 + RPS 전용 최적화
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

  // YES / NO 경로 선택 처리
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
          name: '', 
          phone: '', 
          address: '', 
          type: '상가·원룸 옥상 (RPS 자가용)', 
          content: 'RPS 소규모 자가용 최저 단가 비교 및 진단 요청' 
        });
        setPrivacyAgreed(false);
        setQuoteRoute('select');

        setTimeout(() => {
          router.push('/thank-you');
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
      
      {/* GNB (헤더 상단 바) */}
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

      {/* 1. 히어로 섹션 + 인터랙티브 고전환 폼 */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-12 px-4 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* 가치 제안 (좌측) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold tracking-wider px-3 py-1 rounded mb-4">
              📢 상가·원룸·꼬마빌딩 옥상 맞춤형 설계
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
              상가 관리비 절감,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                생각보다 적은 비용
              </span>으로 가능합니다
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed max-w-xl">
              태양광 설치비가 비쌀까 봐 주저하셨나요? 중간 영업 마진과 과도한 유통 수수료를 걷어낸 <strong>'직영 시공 단가'</strong>로 거품 없는 합리적인 견적을 직접 비교해 보세요.
            </p>

            <div className="hidden lg:block text-slate-400 text-xs space-y-1">
              <p>• 대구·경북 지역 소규모 옥상 자가용(RPS) 전문 지원</p>
              <p>• 타사 견적서 검토를 통한 불필요한 공사비 마진 무료 진단</p>
            </div>
          </div>

          {/* 🔥 친구분 치트키 반영: 인터랙티브 고전환 폼 (우측) */}
          <div id="diagnostic-form" className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 transition-all">
              
              {quoteRoute === 'select' && (
                <div className="text-center py-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">이미 타사 견적을 받아보셨나요?</h2>
                  <p className="text-slate-500 text-xs mb-6">원하시는 경로를 선택하시면 가장 정확한 분석을 제공합니다.</p>
                  
                  <div className="space-y-3">
                    <button 
                      type="button" 
                      onClick={() => handleRouteSelect('yes')}
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1"
                    >
                      <span className="text-base">🙋‍♂️ 네, 이미 받아본 견적이 있습니다</span>
                      <span className="text-[11px] text-emerald-600 font-normal">받으신 견적서의 거품/마진을 무료로 분석·비교해 드립니다</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => handleRouteSelect('no')}
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition text-sm flex flex-col items-center justify-center gap-1"
                    >
                      <span className="text-base">🙅‍♂️ 아니오, 처음 알아보는 중입니다</span>
                      <span className="text-[11px] text-slate-500 font-normal">옥상 평수에 딱 맞는 최저 기준 예상 시공비를 산출해 드립니다</span>
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
                    <button 
                      type="button" 
                      onClick={() => setQuoteRoute('select')}
                      className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"
                    >
                      ← 다시 선택
                    </button>
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
                    <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="정확한 위성 분석을 위해 번지수까지 입력" />
                  </div>

                  {quoteRoute === 'yes' ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">기존 견적 내용 (선택)</label>
                      <textarea 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})} 
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-xs font-medium h-16 resize-none"
                        placeholder="타사에서 받은 대략적인 금액이나 설비 용량을 적어주시면 더욱 정밀한 역제안이 가능합니다."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">예상 옥상 평수 (선택)</label>
                      <input 
                        type="text" 
                        onChange={(e) => setFormData({...formData, content: `[신규 문의] 예상 평수: ${e.target.value} / 자가용 단가 산출 요청`})} 
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" 
                        placeholder="예: 15평, 30평 등" 
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="privacy_agree_rps" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer rounded" required />
                    <label htmlFor="privacy_agree_rps" className="text-[11px] text-slate-500 leading-tight cursor-pointer select-none">
                      <span className="text-red-500 font-bold">[필수]</span> 개인정보 수집 이용 동의{' '}
                      <button type="button" onClick={() => setIsPrivacyModalOpen(true)} className="text-slate-700 underline font-semibold ml-0.5">[보기]</button>
                    </label>
                  </div>

                  <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-600/10 transition-transform active:scale-[0.98] text-sm tracking-wide">
                    {status === 'sending' ? '분석 요청 중...' : quoteRoute === 'yes' ? '타사 견적 거품 검토 신청하기' : '우리 건물 맞춤 단가 확인하기'}
                  </button>

                  {status === 'success' && <p className="text-center text-xs font-bold text-emerald-600 mt-2">✨ 분석 요청 완료! 직영 최저 단가를 검토 후 빠르게 연락드리겠습니다.</p>}
                  {status === 'error' && <p className="text-center text-xs font-bold text-red-500 mt-2">❌ 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. 소형 건물주 의심 타파 코너 */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">태양광 설치비, 꼭 비싸야 할 이유는 없습니다</h2>
        <p className="text-slate-500 text-sm mb-12">"왜 다른 곳보다 합리적인가요?" 소비자가 직접 판단할 수 있는 명확한 차이</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-base text-red-600 mb-2">🛑 일반적인 우회 대행 업체</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              독립 영업사원 마진 수수료 + 중간 유통 마진 + 외주 시공비가 중첩되어 단가가 올라가고, 총액 마케팅(초기 비용 0원) 금융 상품 뒤로 거품을 감춥니다.
            </p>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <h3 className="font-bold text-base text-emerald-700 mb-2">✅ KS에너지 대구지사 직영 구조</h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              불필요한 영업 수수료를 전면 차단하고 대기업 정품 자재 수급부터 책임 시공까지 다이렉트로 진행합니다. **동일 자재 기준 가장 투명한 마진**만 책정합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 소형 평수별 맞춤 설계 예시 (수정된 표) */}
      <section className="bg-white py-16 px-6 border-y border-slate-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">건물 규모별 맞춤 설계 설계안</h2>
          <p className="text-slate-500 text-xs text-center mb-8">상가 및 원룸 옥상 공간을 활용한 실제 자가용(RPS) 설계 예시입니다.</p>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs md:text-sm">
                  <th className="py-3 px-4 font-semibold">옥상 권장 평수</th>
                  <th className="py-3 px-4 font-semibold">예상 용량</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">주요 기대 효과</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 10평~15평</td>
                  <td className="py-4 px-4 text-slate-500">3kW ~ 5kW</td>
                  <td className="py-4 px-4 font-medium text-slate-800 text-left pl-6">🏡 상가주택 기본형 / 고전력 가전 전기세 상쇄</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 20평~30평</td>
                  <td className="py-4 px-4 text-slate-500">6kW ~ 10kW</td>
                  <td className="py-4 px-4 font-medium text-slate-800 text-left pl-6">🏢 일반 원룸·상가 건물 / 공용 관리비 대폭 절감</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">약 40평 이상</td>
                  <td className="py-4 px-4 text-slate-500">15kW ~ 맞춤형</td>
                  <td className="py-4 px-4 font-medium text-slate-800 text-left pl-6">⚡ 중소형 빌딩 / 엘리베이터 및 빌딩 고정비 최소화</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. 본사 레퍼런스 및 하단 푸터 (기존의 강력한 신뢰 지표 유지) */}
      <section className="bg-white py-16 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Proven Track Record</span>
            <h3 className="text-2xl font-bold mt-1 mb-4 text-slate-900">롯데타워 롯데물산이 고른 검증된 기술력</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              국내 최고층 빌딩인 롯데타워와 특급호텔 시그니엘서울의 데이터 기반 전기요금 절감 컨설팅을 성공시킨 기술력 그대로, 대구·경북 자가용 발전소 시공을 책임집니다.
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

      {/* 비즈니스 협력사 롤링 배너 */}
      <section className="bg-slate-100 py-6 overflow-hidden select-none border-y border-slate-200/50">
        <div style={marqueeStyles.marqueeContainer}>
          <div style={marqueeStyles.marqueeTrack}>
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

      {/* 개인정보 모달 */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 text-slate-700 max-w-sm w-full p-6 rounded-2xl shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">개인정보 수집 및 이용 동의</h4>
            <div className="text-xs space-y-2.5 leading-relaxed text-slate-600">
              <p><strong>1. 수집권자 :</strong> 노네임(No Name)</p>
              <p><strong>2. 수집 목적 :</strong> 태양광 시공 비용 비교 안내, 예상 단가 산출 상담 및 안내 연락</p>
              <p><strong>3. 수집 항목 :</strong> 이름, 연락처, 부지 주소, 문의 내용</p> 
              <p><strong>4. 보유 및 이용기간 :</strong> 수집 후 1년 (요청 시 즉시 파기)</p>
            </div>
            <button type="button" onClick={() => setIsPrivacyModalOpen(false)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition text-sm">닫기</button>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-slate-950 text-slate-500 text-center py-10 text-xs border-t border-slate-900 space-y-2">
        <p className="font-semibold text-slate-400">KS에너지 대구지사 | RPS 자가용 견적 비교 전용 랜딩페이지</p>
        <div className="text-slate-600 max-w-md mx-auto leading-relaxed">
          <p>상호명(사업자명): 노네임(Noname) | 대표자: 이정현</p>
          <p>사업자등록번호: 635-67-00527</p>
          <p>주소: 대구 북구 동북로291 901-a97</p>
        </div>
        <p className="text-[10px] text-slate-700 pt-2">© Noname. All rights reserved.</p>
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