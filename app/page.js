'use client';

import React, { useState, useRef } from 'react';
import RealtimePopup from '../components/RealtimePopup';
import { useRouter } from 'next/navigation';

export default function Home() {
  const popupRef = useRef(null);
  const router = useRouter();

  // ✅ 백엔드 API 연동용 데이터 포맷 완벽 유지
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '', 
    type: '공장 지붕 / 건물 옥상',
    content: '실데이터 최적화 버전을 통한 빠른 3초 사업성 진단 요청'
  });
  const [status, setStatus] = useState('');
  
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

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
          type: '공장 지붕 / 건물 옥상', 
          content: '실데이터 최적화 버전을 통한 빠른 3초 사업성 진단 요청' 
        });
        setPrivacyAgreed(false);

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
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded">대구지사</span>
          </div>
          <a href="#diagnostic-form" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            3초 사업성 진단하기
          </a>
        </div>
      </header>

      {/* 1. 히어로 섹션 + 상단 고전환 폼 배치 */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-16 px-4 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* 가치 제안 (왼쪽 7칸) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block bg-red-500 text-white text-xs font-extrabold tracking-wider px-3 py-1 rounded mb-4 animate-pulse">
              🚨 대구·경북 지역 선착순 20개소 우선 분석 (14개 완료)
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
              사용하지 않는 공장·창고 지붕,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                든든한 추가 수익
              </span>이 됩니다
            </h1>
            
            {/* 🔥 [변경] 실제 대구지사 정산 데이터를 기반으로 한 숫자 박스 (모바일 자동 줄바꿈 최적화) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 mb-8 inline-block text-left w-full max-w-xl">
              <p className="text-[11px] md:text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2 text-center lg:text-left">
                ⚡️ 대구·경북 실제 시뮬레이션 지표
              </p>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-sm md:text-base text-slate-300 font-medium">
                  공장·창고 지붕 <span className="text-yellow-400 font-bold underline decoration-2">500평 (약150kW)</span> 기준
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  7년 선납 기준 <span className="block sm:inline-block text-emerald-400 text-2xl md:text-4xl font-black mt-1 sm:mt-0 tracking-tight">최대 6,225만 원 일시 지급</span>
                </h3>
              </div>
              <p className="text-[10px] md:text-[11px] text-slate-400 mt-3 text-center lg:text-left">
                * 임대 조건 및 참여 파트너사 기준이며, 건물 조건에 따라 상이할 수 있습니다.
              </p>
            </div>

            {/* 메인 CTA 버튼 및 하단 '나중에 해야지' 방지 특급 장치 */}
            <div className="mb-8">
              <a href="#diagnostic-form" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto">
                내 건물 예상 수익 무료 분석받기
              </a>

              {/* 🔥 [친구분 추가 피드백 적용] 버튼 바로 밑 고전환 유도 장치 */}
              <div className="mt-4 max-w-md mx-auto lg:mx-0 text-left bg-slate-900/60 p-4 rounded-xl border border-white/10">
                <p className="text-emerald-400 font-extrabold text-xs md:text-sm mb-2 flex items-center gap-1.5 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  📍 현재 대구·경북 사업장 우선 검토 중
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-slate-300 text-xs font-medium text-center lg:text-left">
                  <p className="bg-white/5 py-1 px-2 rounded">✓ 설치비 부담 없이 검토 가능</p>
                  <p className="bg-white/5 py-1 px-2 rounded">✓ 지붕 임대 가능 여부 확인</p>
                  <p className="bg-white/5 py-1 px-2 rounded">✓ 예상 수익 무료 분석</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block text-slate-400 text-xs space-y-1">
              <p>• 누적 분석 검토 건수 : 대구·경북 지역 127건 돌파</p>
              <p>• 주소 정보는 위성 도면 분석 및 선로 용량 조회에만 활용됩니다.</p>
            </div>
          </div>

          {/* 첫 화면 우측 고전환 폼 */}
          <div id="diagnostic-form" className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              <div className="text-center mb-5">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">3초 사업성 무료 진단</h2>
                <p className="text-slate-500 text-xs mt-1">생각할 필요 없이 주소만 남겨주시면 계산해 드립니다.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">성함 / 법인명</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="예: 홍길동 (또는 OO정밀)" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="예: 010-0000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">공장 / 건물 주소</label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm font-medium" placeholder="번지수까지 기재 시 가장 정확합니다." />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input type="checkbox" id="privacy_agree" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer rounded" required />
                  <label htmlFor="privacy_agree" className="text-[11px] text-slate-500 leading-tight cursor-pointer select-none">
                    <span className="text-red-500 font-bold">[필수]</span> 개인정보 수집 이용 동의{' '}
                    <button type="button" onClick={() => setIsPrivacyModalOpen(true)} className="text-slate-700 underline font-semibold ml-0.5">[보기]</button>
                  </label>
                </div>

                <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-600/10 transition-transform active:scale-[0.98] text-sm tracking-wide">
                  {status === 'sending' ? '분석 요청 중...' : '내 건물 예상 수익 확인하기'}
                </button>

                {status === 'success' && <p className="text-center text-xs font-bold text-emerald-600 mt-2">✨ 진단 요청 완료! 24시간 내 리포트를 들고 연락드리겠습니다.</p>}
                {status === 'error' && <p className="text-center text-xs font-bold text-red-500 mt-2">❌ 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>}
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 2. 내 건물도 가능할까요? 섹션 */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">내 건물도 진단 대상일까요?</h2>
        <p className="text-slate-500 text-sm md:text-base mb-12">유휴 공간이 있다면 어디든 고정 수입원이 될 수 있습니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏭</span>
            <h3 className="font-bold text-lg mb-1">일반 제조업 공장</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">자가소비형을 통한 전기세 절감 또는 발전수익 확보</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏢</span>
            <h3 className="font-bold text-lg mb-1">물류 및 유통 창고</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">넓은 지붕 면적을 활용한 대규모 안정적 지붕 임대료 수령</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏬</span>
            <h3 className="font-bold text-lg mb-1">상업용 건물 / 옥상</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">빌딩, 상가 등 사용하지 않는 옥상 공간 자산화</p>
          </div>
        </div>
      </section>

      {/* 3. 실제 수익 예시 섹션 */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">지붕 규모별 파트너사 정산 예시</h2>
          <p className="text-slate-500 text-sm text-center mb-10">실제 대구·경북 지사의 주요 파트너사별 선납 조건 및 정산 지표입니다.</p>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs md:text-sm">
                  <th className="py-3.5 px-4 font-semibold">참여 파트너사</th>
                  <th className="py-3.5 px-4 font-semibold">설치 규모</th>
                  <th className="py-3.5 px-4 font-semibold">선납/지급 조건</th>
                  <th className="py-3.5 px-4 font-semibold text-emerald-400">실제 지급(예상)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">CNCITY 에너지</td>
                  <td className="py-4 px-4 text-slate-500">150kW (약 500평)</td>
                  <td className="py-4 px-4 text-slate-500">7년 선납 (kW당 45,000)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">4,725만 원</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">마디미 에너지</td>
                  <td className="py-4 px-4 text-slate-500">100kW (약 330평)</td>
                  <td className="py-4 px-4 text-slate-500">5년 선납 (kW당 35,000)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">1,799만 원</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">H ENERGY</td>
                  <td className="py-4 px-4 text-slate-500">100kW (약 330평)</td>
                  <td className="py-4 px-4 text-slate-500">5년 선납 (kW당 35,000)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">1,785만 원</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-bold text-slate-700">CTR 에너지</td>
                  <td className="py-4 px-4 text-slate-500">100kW (약 330평)</td>
                  <td className="py-4 px-4 text-slate-500">5년 선납 (kW당 35,000)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">1,785만 원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. 왜 무료로 분석해드릴까요? 섹션 */}
      <section className="py-16 px-6 bg-slate-900 text-slate-300 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">왜 무료로 분석해 드릴까요? 🤔</h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-lg mx-auto">
            "대구·경북 지역 태양광 프로젝트 확대를 위해,<br />
            <strong className="text-emerald-400">사업성이 확인된 우수 지붕 부지를 우선적으로 발굴하고 검토</strong>하고 있기 때문입니다. 선착순 티오 내에서 부담 없이 자산 가치를 확인해 보세요."
          </p>
        </div>
      </section>

      {/* 5. 본사 핵심 실적 배너 */}
      <section className="bg-white py-20 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Proven Track Record</span>
            <h3 className="text-2xl font-bold mt-1 mb-4 text-slate-900">롯데타워 롯데물산이 선택한 검증된 기술력</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              국내 최고층 빌딩인 롯데타워와 특급호텔 시그니엘서울의 데이터 기반 전기요금 절감 컨설팅을 성공시킨 기술력 그대로, 대구·경북 발전소 시공을 책임집니다. 신뢰가 생명인 태양광 사업, 대기업이 고른 파트너와 안전하게 시작하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">공공기관 레퍼런스</p>
              <p className="text-sm font-bold text-slate-800 mt-1">서울시중구시설관리공단 에너지 절감 성과 실현 외 다수</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">최고급 호텔 레퍼런스</p>
              <p className="text-sm font-bold text-slate-800 mt-1">시그니엘 서울 빌딩과 호텔 모두 절감 성과 외 다수</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 자주 묻는 질문(FAQ) 섹션 */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span className="text-emerald-600 mr-2">Q.</span> 초기 설치비 부담이 정말 없나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">네, 조건에 따라 제3자 투자 모델이나 금융 모델을 결합하여 사업주 자부담 0원으로 지붕 임대 사업이나 리스 사업 진행이 가능합니다.</p>
            </div>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span className="text-emerald-600 mr-2">Q.</span> 지붕이 노후되었는데도 설치할 수 있나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">구조 정밀 진단 검토를 먼저 선행합니다. 보강 공사 가능 여부와 지붕 보수 작업을 동반한 하이브리드 솔루션을 무상 제안해 드립니다.</p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span className="text-emerald-600 mr-2">Q.</span> 검토나 사업성 분석 후 시공 계약을 강제하나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">아닙니다. 1차 분석 리포트는 전액 무상 제공되며, 검토 결과를 보신 후 진행 여부는 대표님이 자율적으로 선택하십니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 비즈니스 협력사 롤링 배너 */}
      <section className="bg-slate-100 py-8 overflow-hidden select-none border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 mb-3">
          <p className="text-center text-xs font-bold text-slate-400 tracking-wider uppercase">
            KS에너지 공식 비즈니스 협력사
          </p>
        </div>
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
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes globalMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </section>

      {/* 개인정보 동의 상세 모달 팝업 */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 text-slate-700 max-w-sm w-full p-6 rounded-2xl shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              개인정보 수집 및 이용 동의
            </h4>
            <div className="text-xs space-y-2.5 leading-relaxed text-slate-600">
              <p><strong>1. 수집권자 :</strong> 노네임(No Name)</p>
              <p><strong>2. 수집 목적 :</strong> 지붕 임대 및 지원 사업 관련 상담, 안내 문자/전화 발송</p>
              <p><strong>3. 수집 항목 :</strong> 이름, 연락처, 부지 주소, 부지 형태, 문의 내용</p> 
              <p><strong>4. 보유 및 이용기간 :</strong> 수집 후 1년 (고객 요청 시 즉시 파기)</p>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                ※ 귀하는 동의를 거부할 권리가 있으나, 거부 시 상담 서비스 이용이 제한될 수 있습니다.
              </p>
            </div>
            <button type="button" onClick={() => setIsPrivacyModalOpen(false)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition text-sm">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 하단 푸터 영역 */}
      <footer className="bg-slate-950 text-slate-500 text-center py-10 text-xs border-t border-slate-900 space-y-2">
        <p className="font-semibold text-slate-400">KS에너지 대구지사 | 비즈니스 문의 전용 랜딩페이지</p>
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
    color: '#94a3b8', 
    padding: '0 32px', 
    whiteSpace: 'nowrap',
    display: 'inline-block',
  }
};