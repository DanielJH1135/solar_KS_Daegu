'use client';

import React, { useState, useRef } from 'react';
import RealtimePopup from '../components/RealtimePopup';
import { useRouter } from 'next/navigation';

export default function Home() {
  const popupRef = useRef(null);
  const router = useRouter();

  // ✅ 기존 상태 유지 (API 에러 방지를 위해 type과 content는 기본값으로 유지하되, UI에서는 숨겨 문턱을 낮춥니다)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '', 
    type: '공장 지붕 / 건물 옥상',
    content: '랜딩페이지 리빌딩 버전을 통한 빠른 사업성 분석 요청'
  });
  const [status, setStatus] = useState('');
  
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의하셔야 신청이 가능합니다.');
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
          content: '랜딩페이지 리빌딩 버전을 통한 빠른 사업성 분석 요청' 
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
          <a href="#contact" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            무료 수익 분석 신청
          </a>
        </div>
      </header>

      {/* [변경] 1. 히어로 섹션: 직관적인 의문 제기와 이득 제시 (버전 B 변형) */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full border border-emerald-500/20 mb-6">
            대구·경북 제조업 대표님 및 건물주 전용
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            사용하지 않는 공장·창고 지붕, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              따박따박 나오는 수익이
            </span>될 수 있습니다
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            대구·경북 지역 공장 및 창고 지붕에 설치비 부담 없이 추가 수익이 가능한지 확인해 보세요.
          </p>
          
          {/* 서브 체크리스트 */}
          <div className="inline-block text-left bg-white/5 backdrop-blur-sm rounded-xl p-5 mb-8 w-full max-w-sm border border-white/10">
            <ul class="space-y-2.5 text-sm">
              <li class="flex items-center"><span class="text-emerald-400 mr-2">✓</span> 무료 사업성 분석 리포트</li>
              <li class="flex items-center"><span class="text-emerald-400 mr-2">✓</span> 지붕 임대 가능 여부 확인</li>
              <li class="flex items-center"><span class="text-emerald-400 mr-2">✓</span> 예상 발전 수익 및 절감액 안내</li>
            </ul>
          </div>

          <div>
            <a href="#contact" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto">
              내 건물 예상 수익 무료 분석받기
            </a>
          </div>
        </div>
      </section>

      {/* [변경] 2. 내 건물도 가능할까요? 섹션 */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">내 건물도 가능할까요?</h2>
        <p className="text-slate-500 text-sm md:text-base mb-12">유휴 공간이 있다면 어디든 고정 수입원이 될 수 있습니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏭</span>
            <h3 className="font-bold text-lg mb-1">일반 제조업 공장</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">자가소비형을 통한 전기세 절감 또는 발전수익 확보</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏢</span>
            <h3 class="font-bold text-lg mb-1">물류 및 유통 창고</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">넓은 지붕 면적을 활용한 대규모 안정적 지붕 임대료 수령</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-4xl mb-3">🏬</span>
            <h3 className="font-bold text-lg mb-1">상업용 건물 / 옥상</h3>
            <p className="text-slate-500 text-xs text-center leading-relaxed">빌딩, 상가 등 사용하지 않는 옥상 공간 자산화</p>
          </div>
        </div>
        
        <p className="text-emerald-800 font-semibold bg-emerald-50 py-3 px-6 rounded-xl inline-block text-xs md:text-sm">
          📍 주소만 알려주시면 위성지도 및 현장 조건을 검토해 설치 가능 여부를 안내드립니다.
        </p>
      </section>

      {/* [변경] 3. 실제 수익 예시 섹션 (가장 중요) */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">실제 수익 구조 예시</h2>
          <p className="text-slate-500 text-sm text-center mb-10">지붕 규모에 따라 기대할 수 있는 대략적인 연간 수익 지표입니다.</p>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs md:text-sm">
                  <th className="py-3.5 px-4 font-semibold">건물 유형</th>
                  <th className="py-3.5 px-4 font-semibold">설치 규모</th>
                  <th className="py-3.5 px-4 font-semibold text-emerald-400">예상 연간 수익</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-medium text-slate-700">중소형 공장 지붕</td>
                  <td className="py-4 px-4 text-slate-500">300kW</td>
                  <td className="py-4 px-4 font-bold text-emerald-600">연 3,000만 원 ~</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-medium text-slate-700">중대형 물류창고</td>
                  <td className="py-4 px-4 text-slate-500">500kW</td>
                  <td className="py-4 px-4 font-bold text-emerald-600">연 5,000만 원 ~</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-4 font-medium text-slate-700">대기업 대형 공장</td>
                  <td className="py-4 px-4 text-slate-500">1MW</td>
                  <td className="py-4 px-4 font-bold text-emerald-600">연 1억 원 ~</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-right">※ 음영 상태, 지붕 방향, 한전 계통 연계 용량 등 세부 조건에 따라 변동될 수 있습니다.</p>
        </div>
      </section>

      {/* [변경] 4. 왜 무료로 분석해드릴까요? 섹션 */}
      <section className="py-16 px-6 bg-slate-900 text-slate-300 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">왜 무료로 분석해 드릴까요? 🤔</h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-lg mx-auto">
            "대구·경북 지역 태양광 프로젝트 확대를 위해,<br />
            <strong className="text-emerald-400">사업성이 확인된 우수 지붕 부지를 우선적으로 발굴하고 검토</strong>하고 있기 때문입니다. 부담 없이 자산 가치를 먼저 확인해 보세요."
          </p>
        </div>
      </section>

      {/* [유지 및 배치 최적화] 본사 핵심 실적 배너 (신뢰 요소 강화) */}
      <section className="bg-white py-20 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Proven Track Record</span>
            <h3 className="text-2xl font-bold mt-1 mb-4 text-slate-900">롯데타워 롯데물산이 선택한 검증된 기술력</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              국내 최고층 빌딩인 롯데타워와 특급호텔 시그니엘서울의 데이터 기반 전기요금 절감 컨설팅을 성공시킨 기술력 그대로, 대구·경북 발전소 시공을 책임집니다. 신뢰가 가장 중요한 장기 사업인 만큼 확실한 파트너와 함께하세요.
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

      {/* [변경] 5. 이런 분들께 추천합니다 섹션 */}
      <section className="py-20 px-6 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">이런 대표님들께 추천합니다</h2>
        <ul className="space-y-4">
          <li className="flex items-start bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-xl mr-3">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm md:text-base">사용하지 않는 빈 지붕이나 창고가 있다</h4>
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-xl mr-3">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm md:text-base">매달 고정으로 나오는 산업용 전기요금이 부담스럽다</h4>
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-xl mr-3">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm md:text-base">공장 및 건물의 활용도와 자산 가치를 높이고 싶다</h4>
            </div>
          </li>
          <li className="flex items-start bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-xl mr-3">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm md:text-base">지붕 임대 등 안정적인 리스크 제로 사업을 검토 중이다</h4>
            </div>
          </li>
        </ul>
      </section>

      {/* [유지 및 밸런스] 강점 섹션 */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              지사는 가까워야 하고,<br />본사는 신뢰할 수 있어야 합니다
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              태양광 발전소는 한 번 구축하면 20년 이상 가동됩니다. 시공업체가 멀리 있거나 도중에 사라지면 발전 손실을 고스란히 사업주가 떠안게 됩니다. 
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>KS에너지 대구지사</strong>는 대구·경북 전 지역에 문제가 발생할 시 즉각 대응할 수 있는 지역 밀착형 사후관리 인프라를 구축하고 있습니다.
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

      {/* [변경] 6. 자주 묻는 질문(FAQ) 섹션 */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span class="text-emerald-600 mr-2">Q.</span> 초기 설치비 부담이 정말 없나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">네, 조건에 따라 제3자 투자 모델이나 금융 지원 모델을 결합하여 사업주 자부담 0원으로 지붕 임대 사업이나 리스 사업 진행이 가능합니다.</p>
            </div>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span class="text-emerald-600 mr-2">Q.</span> 지붕이 노후되었는데도 설치할 수 있나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">구조 정밀 진단 검토를 먼저 선행합니다. 보강 공사가 필요한지 여부와 적합한 맞춤 솔루션을 함께 제공해 드립니다.</p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1.5 flex items-start text-slate-900"><span class="text-emerald-600 mr-2">Q.</span> 검토나 사업성 분석에 비용이 청구되나요?</h3>
              <p className="text-slate-600 text-sm pl-6 leading-relaxed">아닙니다. 위성 도면 분석과 계통 연계 용량 기본 조회를 포함한 모든 1차 리포트 발행 과정은 전액 무료입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 비즈니스 협력사 롤링 배너 (폼 바로 위에 배치해 신뢰 피크 달성) */}
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

      {/* [변경] 7. 생각을 없앤 1분 무료 사업성 분석 신청 폼 */}
      <section id="contact" className="py-20 px-6 max-w-xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">1분 무료 사업성 분석 신청</h2>
            <p className="text-sm text-slate-500">생각하실 필요 없이 딱 3가지 정보만 남겨주시면 리포트를 발송해 드립니다.</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">성함 / 법인명</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="예시: 홍길동 (또는 OO기획)" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">연락처</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="예시: 010-0000-0000" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-2">공장 / 건물 주소</label>
              <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500 text-sm text-slate-900" placeholder="번지수까지 정확히 입력하시면 분석이 더욱 빨라집니다." />
            </div>
            
            {/* 개인정보 수집 동의 체크박스 (기존 로직 및 상태 100% 매칭) */}
            <div className="flex items-start gap-2 pt-1">
              <input 
                type="checkbox" 
                id="privacy_agree" 
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-emerald-600 cursor-pointer rounded"
                required 
              />
              <label htmlFor="privacy_agree" className="text-xs text-slate-500 leading-tight cursor-pointer select-none">
                <span className="text-red-500 font-bold">[필수]</span> 개인정보 수집 및 이용에 동의합니다.{' '}
                <button 
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-slate-700 underline font-semibold hover:text-slate-900 ml-1"
                >
                  [자세히 보기]
                </button>
              </label>
            </div>

            <button type="submit" disabled={status === 'sending'} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-md transition-colors text-sm mt-2">
              {status === 'sending' ? '분석 요청서 전송 중...' : '사업성 분석 요청하기'}
            </button>

            {status === 'success' && <p className="text-center text-sm font-semibold text-emerald-600 mt-2">✨ 분석 요청이 완료되었습니다! 24시간 내 리포트를 들고 연락드리겠습니다.</p>}
            {status === 'error' && <p className="text-center text-sm font-semibold text-red-500 mt-2">❌ 전송 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>}
          </form>
        </div>
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
            <button 
              type="button"
              onClick={() => setIsPrivacyModalOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 하단 푸터 영역 (당근 필수 필수요소 및 고유 데이터 100% 보존) */}
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